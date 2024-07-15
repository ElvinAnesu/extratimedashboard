"use client";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function DashboardLayout({children}){
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }
    }, []);
    return(
        <main className="min-h-screen max-w-screen bg-white text-black flex flex-col p-16">
            <Topbar />
            <div className="w-full h-full grid grid-cols-5 mt-8">
                <div>
                    <Sidebar />
                </div>
                <div className="col-span-4 px-4">
                    {children}
                </div>
            </div>
        </main>
    )
}