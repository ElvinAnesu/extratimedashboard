"use client"
import { useEffect, useState } from "react"
import { PersonIcon } from "@radix-ui/react-icons"
import Image from "next/image"


export default function Topbar(){ 
    const [username, setUsername] = useState()

    useEffect(()=>{
        const _username = localStorage.getItem("username")
        setUsername(_username)
    },[])

    return(
        <div className="h-12 flex w-full absolute top-0 items-center justify-end left-0 p-2">
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-white">{username}</h1>       
                <Image src="/avatar.png" alt="avatar" height={45} width={45}  className="rounded-full"/>
            </div>
        </div>
    )
}