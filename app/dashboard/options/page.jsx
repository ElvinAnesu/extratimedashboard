"use client"
import Header from "@/components/header"
import { useRouter } from "next/navigation"

export default function Options(){

    const router = useRouter()

    return(
        <div className="w-full h-full flex flex-col gap-8">
            <Header title="Options" />
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <button className="flex rounded shadow flex-col p-4 bg-gray-100 w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/users")}>
                        <h1 className="text-xl">Users</h1>
                    </button>
                    <button className="flex rounded shadow flex-col p-4 bg-gray-100 w-52 h-24 gap-2 items-center justify-center"
                        onClick={(e) => router.push("/dashboard/locations")}>
                        <h1 className="text-xl">Locations</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}