export default function TopicInput({ value, onChange })
{
    return (
        <input 
            type="text" 
            className="h-12 w-full px-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter topic e.g. Python Basics, Bitwise Operators"
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}