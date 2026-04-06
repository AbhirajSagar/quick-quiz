import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faFileArrowUp } from "@fortawesome/free-solid-svg-icons"

const TOOLS_LIST =
[
    {
        label: "Create from Topic",
        href: "/create",
        icon: faPen
    },
    {
        label: "Upload PDF",
        href: "/upload",
        icon: faFileArrowUp
    }
]

export default function Page()
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4 sm:p-10">
            <div className="w-full max-w-xl">
                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
                    Choose a Tool
                </h1>

                <div className="grid gap-4">
                    {
                        TOOLS_LIST.map((item, index) =>
                            <Link
                                key={index}
                                href={item.href}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-700 group-hover:bg-gray-600 transition">
                                    <FontAwesomeIcon icon={item.icon} className="text-white text-lg" />
                                </div>

                                <span className="text-white text-lg font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}