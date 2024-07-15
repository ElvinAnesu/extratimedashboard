"use client"
import { useEffect, useState } from "react"
import { PersonIcon } from "@radix-ui/react-icons"


export default function Topbar(){ 
    const [username, setUsername] = useState()

    useEffect(()=>{
        const _username = localStorage.getItem("username")
        setUsername(_username)
    },[])

    return(
        <div className="bg-white h-12 flex shadow w-full absolute top-0 items-center justify-end left-0 px-2">
            <div className="flex items-center gap-2">
                <h1 className="text-sm">{username}</h1>
                <div className="bg-gray-200 rounded-full flex items-center justify-center p-2">
                    <PersonIcon height={24} width={24} />
                </div>
            </div>
        </div>
    )
}