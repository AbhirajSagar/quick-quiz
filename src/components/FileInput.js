export default function FileInput({ value, onChange })
{
    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-400">Upload PDF</span>

            <input 
                type="file" 
                accept=".pdf"
                onChange={(e)=>
                {
                    onChange(e.target.files[0])
                }}
                className="bg-gray-700 p-2 rounded-lg cursor-pointer"
            />
            {
                value &&
                <span className="text-xs text-gray-400">
                    {value.name}
                </span>
            }
        </div>
    )
}