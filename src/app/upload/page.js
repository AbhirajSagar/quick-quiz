'use client';

import { useState } from "react"
import QuestionSlider from "@/components/QuestionSlider"
import LevelSelect from "@/components/LevelSelect"
import ExplanationToggle from "@/components/ExplanationToggle"
import FileInput from "@/components/FileInput"
import ExtractText from "@/lib/ExtractText"
import { generateQuizFromText } from "@/action/generateQuiz"
import QuizPage from "@/components/QuizPage"

export default function Page()
{
    const [file, setFile] = useState(null)
    const [count, setCount] = useState(10)
    const [level, setLevel] = useState("beginner")
    const [includeExplanations, setIncludeExplanations] = useState(true)
    const [loading, setIsLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);

    async function extractText()
    {
        if(!file) return;
        
        setIsLoading(true);
        try {
            const text = await ExtractText(file);
            if(text.length == 0) {
                setIsLoading(false);
                return;
            }

            const data = await generateQuizFromText(text, count, level, includeExplanations);
            setQuizData(data);
        } catch (error) {
            console.error(error);
            alert("Failed to generate quiz. Please try again.");
        }
        setIsLoading(false);
    }

    if (quizData) {
        return <QuizPage title={file.name} quiz={quizData} onBack={() => setQuizData(null)} />
    }

    return (
        <div className="p-2 sm:p-12 bg-gray-900 min-h-screen flex flex-col items-center text-white">

            <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg overflow-hidden">

                <div className="px-6 py-4 border-b border-gray-700">
                    <h1 className="text-xl font-semibold text-center">
                        Generate Quiz from PDF
                    </h1>
                </div>

                <div className="p-6 flex flex-col gap-6">

                    <FileInput value={file} onChange={setFile} />

                    <QuestionSlider value={count} onChange={setCount} />

                    <LevelSelect value={level} onChange={setLevel} />

                    <ExplanationToggle value={includeExplanations} onChange={setIncludeExplanations} />

                    <button 
                        disabled={!file || loading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                        onClick={extractText}
                    >
                        {loading && (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {loading ? "Generating..." : "Generate Quiz"}
                    </button>

                </div>

            </div>

        </div>
    )
}