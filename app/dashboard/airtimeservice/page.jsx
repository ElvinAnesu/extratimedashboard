"use client"
import Header from "@/components/header"
import AirtimeTransactionTable from "@/components/tables/airtimetransactions"
import TransactionTable from "@/components/tables/transactionstable"
import { useState } from "react"

export default function AirtimeService(){

    const [showTab, setShowtab] = useState("new")
    

    return(
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Econet Airtime" />
            <div className="flex items-center justify-end">
                <button className={`${showTab=="new"? "bg-blue-900" :"bg-gray-400"} px-4 text-xs font-semibold text-white`}
                    onClick={()=> setShowtab("new")}>New</button>
                <button className={`${showTab=="legacy"? "bg-blue-900" :"bg-gray-400"} px-4 text-xs font-semibold text-white`}
                 onClick={()=> setShowtab("legacy")}>Legacy</button>
            </div>
            {showTab == "legacy"? <TransactionTable /> : <AirtimeTransactionTable />}
        </div>
    )
}