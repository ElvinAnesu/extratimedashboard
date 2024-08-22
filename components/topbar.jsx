"use client"
import { useEffect, useState } from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Image from "next/image"


export default function Topbar({showMobileMenu}){ 
    const [username, setUsername] = useState()
    useEffect(()=>{
        const _username = localStorage.getItem("username")
        setUsername(_username)
    },[])
    return(
        <div className="h-12 flex w-full absolute top-0 items-center justify-between md:justify-end left-0 p-2">
            <button className="text-white p-2 border rounded border-gray-200 md:hidden"
                onClick={showMobileMenu}>
                <HamburgerMenuIcon />
            </button>
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-white">{username}</h1>       
                <Image src="/avatar.png" alt="avatar" height={45} width={45}  className="rounded-full"/>
            </div>
        </div>
    )
}