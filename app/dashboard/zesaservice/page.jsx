"use client"
import BuyZesaForm from "@/components/forms/buyzesaform"
import Header from "@/components/header"
import TransactionTable from "@/components/tables/transactionstable"
import { useState } from "react"

export default function AirtimeService(){

    const [showTab, setShowtab] = useState("transactions")

    return(
        <div className="w-full h-full flex flex-col gap-4 bg-white">
            <Header title="Econet Airtime" />
            <div className="flex w-full items-center justify-end">
                <div className="flex">
                    <button className={`${showTab === "transactions" ? "bg-blue-900 text-white" :"bg-gray-200 hover:bg-blue-200"}  text-sm font-semibold p-2`}
                        onClick={()=>{setShowtab("transactions")}}>
                        Transactions
                    </button>
                    <button className={`${showTab === "execute" ? "bg-blue-900 text-white" :"bg-gray-200 hover:bg-blue-200"} text-sm font-semibold p-2`}
                        onClick={()=>{setShowtab("execute")}}>
                        Execute
                    </button>
                </div>
            </div>
            {showTab === "transactions" ?
                <TransactionTable />:
                showTab === "execute"?
                <BuyZesaForm /> : ""}
        </div>
    )
}