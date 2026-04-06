export default function ExplanationToggle({ value, onChange })
{
    return (
        <label className="flex items-center gap-2 text-sm text-gray-300">
            <input 
                type="checkbox" 
                checked={value} 
                onChange={e => onChange(e.target.checked)}
                className="accent-blue-600"
            />
            Include Explanations
        </label>
    )
}