'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import QuizPage from "@/components/QuizPage"

export default function Home() 
{
  const router = useRouter()

  const [topic, setTopic] = useState("")
  const [level, setLevel] = useState("Beginner")
  const [questionCount, setQuestionCount] = useState(5)
  const [includeExplanations, setIncludeExplanations] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [localQuizzes, setLocalQuizzes] = useState([])

  useEffect(() =>
  {
    try
    {
      const quizzes = JSON.parse(localStorage.getItem('quizzes') ?? '[]')
      setLocalQuizzes(quizzes)
    }
    catch
    {
      setLocalQuizzes([])
    }
  }, [])

  function handleNext()
  {
    router.push(`/generate/${encodeURIComponent(topic)}?count=${Number(questionCount)}&level=${level}&explanations=${includeExplanations}`)
  }

  if(selectedQuiz)
    return <QuizPage onBack={() => setSelectedQuiz(null)} title={selectedQuiz.title} quiz={selectedQuiz.questions}/>

  return (
    <div className="p-12 bg-gray-900 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto rounded-lg bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg mb-4">
        <h2 className="text-white text-3xl text-center w-full font-bold tracking-wide">Create Quiz</h2>
      </div>

      <div className="w-full max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-xl flex flex-col gap-6">
        <p className="w-full text-center text-white text-lg">
          Enter your topic and other details.
        </p>

        <input 
          type="text" 
          className="h-12 w-full px-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your topic here. e.g. Python Basics, Bitwise Operators, Software Engineering"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />

        <select 
          className="h-12 w-full px-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={level}
          onChange={e => setLevel(e.target.value)}
        >
          <option value='beginner'>Beginner</option>
          <option value='intermediate'>Intermediate</option>
          <option value='advanced'>Advanced</option>
        </select>

        <div className="flex flex-col gap-2">
          <label className="text-white">Number of Questions: {questionCount}</label>
          <input 
            type="range" 
            min={1} 
            max={50} 
            value={questionCount} 
            onChange={e => setQuestionCount(Number(e.target.value))}
            className="w-full h-2 rounded-lg bg-blue-500 accent-blue-600"
          />
        </div>

        <label className="flex items-center gap-2 text-white">
          <input 
            type="checkbox" 
            checked={includeExplanations} 
            onChange={e => setIncludeExplanations(e.target.checked)}
            className="accent-blue-600"
          />
          Include Explanations
        </label>

        <div className="flex justify-end mt-4">
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 transition"
            onClick={handleNext}
            disabled={!topic || questionCount <= 0}
          >
            Next
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 bg-gray-800 mt-4 rounded-lg shadow-xl flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Saved Quizzes</h2>
        {localQuizzes.map((quiz, index) => (
          <div key={index} onClick={() => setSelectedQuiz(quiz)} className="w-full bg-gray-700 h-14 rounded-md flex px-5 justify-start items-center cursor-pointer hover:translate-y-1">
            <p>{decodeURIComponent(quiz.title)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}