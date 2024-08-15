"use client"
import Header from "@/components/header"
import AgentTransactionsTable from "@/components/tables/agenttransactionstable"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import AgentsTable from "@/components/tables/agentstable"



export default function AgentsTransactions(){ 

    const router = useRouter();

    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <h1>Sort by:</h1>
                        <select className="rounded p-2 border border-gray-400 ">
                            <option>Default</option>
                            <option>Cash in hand</option>
                            <option>Total sales</option>
                            <option>Location</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <input className="h-9 border rounded border-gray-400  p-2 text-black"
                            placeholder="Search"
                            type="text"
                            />
                        <button className="px-4 rounded bg-blue-600 text-white flex gap-2 flex items-center justify-center">
                            <MagnifyingGlassIcon />
                            Search
                        </button>
                    </div>
                </div>
                <AgentTransactionsTable />
            </div>
        </div>
    )
}
