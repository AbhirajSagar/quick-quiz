'use client'

import { faBackward, faDownload, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function QuizPage({onBack = null, title, quiz }) 
{
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [quizSaved, setIsQuizSaved] = useState(false);
    const [shuffledIndexes, setShuffledIndexes] = useState([]);
    const [scoreCardVisible, setScoreCardVisible] = useState(false);
    const [score, setScore] = useState(0);
    const router = useRouter();

    if(onBack === null) onBack = () => router.push('/')

    const currentQuestion = quiz[currentQuestionIndex];
    const totalQuestions = quiz.length;

    useEffect(() => {
        const indexes = currentQuestion.options.map((_, index) => index);

        for (let i = indexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }

        setShuffledIndexes(indexes);
    }, [currentQuestion]);

    function handleSelect(index) 
    {
        if (selectedIndex === null)
        {
            setSelectedIndex(index);
            
            if(index === currentQuestion.correct_index)
            setScore(s => s + 1);
        }
    }

    function getOptionStyle(index) {
        if (selectedIndex === null) return 'hover:bg-gray-600';
        if (index === currentQuestion.correct_index) return 'bg-green-500 hover:bg-green-600';
        if (index === selectedIndex) return 'bg-red-500 hover:bg-red-700';
        return '';
    }

    function prevQuestion() 
    {
        if(scoreCardVisible) 
        {
            setScoreCardVisible(false);
        }
            
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedIndex(null);
        }
    }

    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedIndex(null);
        }
    }

    function saveQuiz() 
    {
        const savedQuizzes = localStorage.getItem('quizzes') ?? '[]'
        let quizzes = []

        try 
        {
            quizzes = JSON.parse(savedQuizzes)
        }
        catch 
        {
            quizzes = []
        }

        const newQuizData =
        {
            title: title,
            questions: quiz
        }

        quizzes.push(newQuizData)

        localStorage.setItem('quizzes', JSON.stringify(quizzes))
        setIsQuizSaved(true)
    }

    return (
        <div className="p-4 sm:p-12 bg-gray-900 min-h-screen">
            <div className="w-full max-w-4xl mx-auto rounded-lg bg-gray-800 px-4 py-4 flex justify-between items-center">
                <FontAwesomeIcon onClick={onBack} icon={faBackward} className="text-2xl bg-gray-900 p-2 rounded text-white" />
                <h2 className="text-white text-2xl font-bold">
                    {currentQuestionIndex + 1} of {totalQuestions}
                </h2>
                {!quizSaved && <FontAwesomeIcon disabled={quizSaved} onClick={saveQuiz} icon={faSave} className='text-2xl text-white disabled:text-white/10 bg-gray-900 p-2 rounded' />}
            </div>

            <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 mt-4 rounded-lg">
                <p className="w-full text-center text-white text-lg mb-6">{currentQuestion.question}</p>
                <section className="w-full rounded overflow-hidden bg-gray-700">
                    {
                        scoreCardVisible ?
                        (
                            <div className='w-full h-56 flex justify-center items-center flex-col'>
                                <p className=''>Total Questions Attempted</p>
                                <p className='font-extrabold text-5xl mt-5'>{score}/{totalQuestions}</p>
                            </div>
                        )
                        :
                        (
                            shuffledIndexes.map((shuffledIndex, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(shuffledIndex)}
                                    className={`p-4 border-b border-gray-600 last:border-0 cursor-pointer transition-colors ${getOptionStyle(shuffledIndex)}`}
                                >
                                    <p className="text-white">
                                        {currentQuestion.options[shuffledIndex]}
                                    </p>

                                    {(shuffledIndex === currentQuestion.correct_index && selectedIndex !== null) && currentQuestion.explanation}
                                </div>
                            ))
                        )
                    }
                </section>

                <div className="flex justify-between mt-4">
                    <button onClick={prevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50">Prev</button>
                    {
                        currentQuestionIndex === totalQuestions - 1 ? 
                        <button onClick={() => setScoreCardVisible(true)} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50">Score</button>
                        : <button onClick={nextQuestion} disabled={currentQuestionIndex === totalQuestions - 1} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50">Next</button>
                    }
                </div>
            </div>
        </div>
    );
}