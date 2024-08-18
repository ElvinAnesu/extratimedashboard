"use client"
import Header from "@/components/header";
import { useRouter } from "next/navigation";



export default function Services(){ 

    const router = useRouter()
    return(
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <Header title="Services" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <button className="flex rounded shadow flex-col p-4 bg-blue-900 text-white w-full md:w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/airtimeservice")}>
                        <h1 className="text-xl">Econet</h1>
                    </button>
                    <button className="flex rounded shadow flex-col p-4 bg-blue-900 text-white w-full md:w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/zesaservice")}>
                        <h1 className="text-xl">Zesa</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}