"use client"
import BuyAirtimeForm from "@/components/forms/buyairtimeform"
import LoadAirtimeVouuchersForm from "@/components/forms/loadairtimevouchersform"
import Header from "@/components/header"
import AirtimeBalancesTable from "@/components/tables/airtimebalancestable"
import TransactionTable from "@/components/tables/transactionstable"
import { useState } from "react"

export default function AirtimeService(){

    const [showTab, setShowtab] = useState("balances")

    return(
        <div className="w-full h-full flex flex-col gap-4 bg-white">
            <Header title="Econet Airtime" />
            <div className="flex w-full items-center justify-end">
                <div className="flex">
                    <button className={`${showTab==="balances" ? "bg-blue-900 text-white":"bg-gray-200 text-black hover:bg-blue-200"} text-sm font-semibold p-2`}
                        onClick={() => setShowtab("balances")}>
                        Balances
                    </button>
                    <button className={`${showTab==="transactions" ? "bg-blue-900 text-white":"bg-gray-200 text-black hover:bg-blue-200"} text-sm font-semibold p-2`}
                        onClick={() => setShowtab("transactions")}>
                        Transactions
                    </button>
                    <button className={`${showTab==="execute" ? "bg-blue-900 text-white":"bg-gray-200 text-black hover:bg-blue-200"} text-sm font-semibold p-2`}
                        onClick={() => setShowtab("execute")}>
                        Execute
                    </button>
                    <button className={`${showTab==="loadvouchers" ? "bg-blue-900 text-white":"bg-gray-200 text-black hover:bg-blue-200"} text-sm font-semibold p-2`}
                        onClick={() => setShowtab("loadvouchers")}>
                        Load Vouchers
                    </button>
                </div>
            </div>
            {showTab === "balances"? 
                <AirtimeBalancesTable /> : showTab === "transactions"? 
                <TransactionTable /> : showTab === "loadvouchers" ? 
                <LoadAirtimeVouuchersForm /> :showTab === "execute"?
                <BuyAirtimeForm /> : ""}
        </div>
    )
}