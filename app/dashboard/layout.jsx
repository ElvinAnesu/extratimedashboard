"use client";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Mobilenav from "@/components/mobilenave";



export default function DashboardLayout({children}){
    const router = useRouter()

    const [showmobilenav, setShowMobileNav] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }
    }, []);
    return(
        <main className="min-h-screen max-w-screen bg-gradient-to-t from-slate-300 via-blue-200 to-blue-900 text-black flex flex-col md:p-8">
            <Topbar showMobileMenu={()=>setShowMobileNav(true)}/>
            <div className="w-full h-full md:grid md:grid-cols-5 mt-8">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <div className="col-span-4 md:px-4">
                    {children}
                </div>
            </div>
            {showmobilenav && <Mobilenav hideMenu={()=>setShowMobileNav(false)}/>}
        </main>
    )
}