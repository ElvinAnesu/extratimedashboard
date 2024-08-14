"use client";
import Header from "@/components/header";
import AgentsTable from "@/components/tables/agentstable";
import { useRouter } from "next/navigation";



export default function Agents(){ 

    const router = useRouter();

    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-start">
                    <h1>F:</h1>
                </div>
                <AgentsTable />
            </div>
        </div>
    )
}