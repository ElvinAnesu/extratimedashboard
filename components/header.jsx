import { ArrowLeftIcon } from "@radix-ui/react-icons"

export default function Header({title, onReturn}){ 
    return( 
        <div className="flex items-center p-2 h-9 bg-blue-900 text-white rounded shadow w-full gap-2">
            <button onClick={onReturn}>
                <ArrowLeftIcon />
            </button>
            <h1 className="font-semibold">{title}</h1>
        </div>
    )
}