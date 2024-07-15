"use client"
import Header from "@/components/header";
import { useRouter } from "next/navigation";



export default function Services(){ 

    const router = useRouter()
    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Services" />
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <button className="flex rounded shadow flex-col p-4 bg-gray-100 w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/airtimeservice")}>
                        <h1 className="text-xl">Airtime</h1>
                    </button>
                    <button className="flex rounded shadow flex-col p-4 bg-gray-100 w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/zesaservice")}>
                        <h1 className="text-xl">ZESA</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}