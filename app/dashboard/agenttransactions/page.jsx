"use client"
import Header from "@/components/header"
import AgentTransactionsTable from "@/components/tables/agenttransactionstable"
import { useRouter } from "next/navigation"




export default function AgentsTransactions(){ 

    const router = useRouter();

    return(
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <AgentTransactionsTable />
            </div>
        </div>
    )
}
