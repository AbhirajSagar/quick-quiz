export default function SavedQuizzes({ quizzes, onSelect })
{
    return (
        <div className="w-full max-w-4xl mt-4 bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Saved Quizzes</h2>

            {
                quizzes.length === 0 &&
                <p className="text-gray-400 text-sm">No quizzes yet</p>
            }

            {
                quizzes.map((quiz, index) =>
                (
                    <div 
                        key={index}
                        onClick={() => onSelect(quiz)}
                        className="bg-gray-700 h-14 rounded-lg flex items-center px-4 cursor-pointer hover:bg-gray-600 transition"
                    >
                        {decodeURIComponent(quiz.title)}
                    </div>
                ))
            }
        </div>
    )
}