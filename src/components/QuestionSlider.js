export default function QuestionSlider({ value, onChange })
{
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
                Number of Questions: {value}
            </label>
            <input 
                type="range" 
                min={1} 
                max={50} 
                value={value} 
                onChange={e => onChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-blue-500 accent-blue-600"
            />
        </div>
    )
}