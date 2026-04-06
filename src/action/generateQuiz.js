'use server'

import { Groq } from 'groq-sdk'
import { CreateTextPrompt } from '@/lib/Prompt';
import LevelTypes from '@/lib/LevelTypes';

export async function generateQuizFromText(text, count, level, explanations) 
{
    if(!text) throw new Error(JSON.stringify({message: 'Text not defined', code: 400}))

    if(!count || isNaN(count)) throw new Error(JSON.stringify({message: 'Count not defined', code: 400}));

    if(!level || !LevelTypes.includes(level.toUpperCase())) throw new Error(JSON.stringify({message: 'Level not defined', code: 400}));

    if(explanations === undefined) throw new Error(JSON.stringify({message: 'Explanations not defined', code: 400}));

    const prompt = CreateTextPrompt(text, count, level, explanations);
    const groq = new Groq({apiKey: process.env.NEXT_PUBLIC_GROQ_KEY});
    const messages = [{role : "user", content : prompt}]

    const chatCompletion = await groq.chat.completions.create
    ({
        messages,
        "model": "qwen/qwen3-32b",
        "temperature": 0.6,
        "max_completion_tokens": 4096,
        "top_p": 0.95,
        "stream": false,
        "reasoning_effort": "default",
        "response_format": {"type": "json_object"},
        "stop": null,
    });

    if(chatCompletion?.choices?.length == 0) throw new Error(JSON.stringify({message: 'Invalid AI Generation. Try again later', code : 500}))
    const reply = chatCompletion.choices[0];
    const content = reply?.message?.content ?? '{}';
    const data = JSON.parse(content);   
    
    if(data.length == 0 || !data.questions && !Array.isArray(data)) 
    {
         throw new Error(JSON.stringify({message: 'Invalid AI Generation. Try again later', code : 500}))
    }

    // Handle if the model returned an object with a "questions" array, or just an array directly
    return Array.isArray(data) ? data : (data.questions || []);
}