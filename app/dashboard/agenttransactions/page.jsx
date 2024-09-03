"use client"
import Header from "@/components/header"
import AgentTransactionsTable from "@/components/tables/agenttransactionstable"



export default function AgentsTransactions(){ 
    return(
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <AgentTransactionsTable />
            </div>
        </div>
    )
}
