import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ErrorPage({error})
{
    const errorObj = JSON.parse(error.message);
    return (
        <div className="w-full h-screen flex-col bg-gray-900 flex justify-center items-center">
            <FontAwesomeIcon icon={faWarning} className="h-25 w-25 text-gray-800"/>
            <p className="mt-4 text-gray-400 text-2xl font-semibold">Error Code {errorObj.code ?? "500"}</p>
            <p className="text-gray-400 text-lg font-normal">{errorObj.message}</p>
        </div>
    );
}