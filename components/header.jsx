"use client"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

export default function Header({title}){ 
    const router = useRouter()
    return( 
        <div className="flex items-center p-2 h-9 bg-blue-900 text-white rounded shadow w-full gap-2">
            <button onClick={()=> router.back()}>
                <ArrowLeftIcon />
            </button>
            <h1 className="font-semibold">{title}</h1>
        </div>
    )
}