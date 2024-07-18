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
            <TransactionTable />
        </div>
    )
}