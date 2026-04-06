import { Groq } from 'groq-sdk'
import { CreatePrompt } from '@/lib/Prompt';
import ErrorPage from '@/components/ErrorPage';
import LevelTypes from '@/lib/LevelTypes';
import QuizPage from '@/components/QuizPage';

export default async function Page({params, searchParams})
{
    try
    {
        const p = await params;
        const q = await searchParams;

        const topic = p.topic;
        if(!topic) throw new Error(JSON.stringify({message: 'Topic not defined', code: 400}))

        const count = q.count;
        if(!count || isNaN(count)) throw new Error(JSON.stringify({message: 'Count not defined', code: 400}));

        const level = q.level;
        if(!level || !LevelTypes.includes(level.toUpperCase())) throw new Error(JSON.stringify({message: 'Level not defined', code: 400}));

        const explanations = q.explanations;
        if(!explanations) throw new Error(JSON.stringify({message: 'Explanations not defined', code: 400}));

        const prompt = CreatePrompt(count, topic, level, explanations);
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
        if(data.length == 0) throw new Error(JSON.stringify({message: 'Invalid AI Generation. Try again later', code : 500}))

        return <QuizPage title={topic} quiz={data}/>
    }
    catch (error)
    {
        return <ErrorPage error={error}/>
    }
}