"use client"
import Header from "@/components/header"
import AgentTransactionsTable from "@/components/tables/agenttransactionstable"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"



export default function AgentsTransactions(){ 

    const router = useRouter();

    return(
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Agents" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-sm text-gray-300">
                            Sort by:</h1>
                        <select className="rounded px-2 text-sm py-1 border border-gray-400 ">
                            <option>Default</option>
                            <option>Cash in hand</option>
                            <option>Total sales</option>
                            <option>Location</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <input className=" border rounded border-gray-400  px-2 py-1 text-black text-sm"
                            placeholder="search"
                            type="text"
                            />
                        <button className="px-2 rounded bg-blue-600 text-white flex gap-1 text-sm flex items-center justify-center">
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
