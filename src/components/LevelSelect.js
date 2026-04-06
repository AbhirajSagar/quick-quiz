export default function LevelSelect({ value, onChange })
{
    return (
        <select 
            className="h-12 w-full px-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option value='beginner'>Beginner</option>
            <option value='intermediate'>Intermediate</option>
            <option value='advanced'>Advanced</option>
        </select>
    )
}