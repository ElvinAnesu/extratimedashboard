"use client"
import DashboardCard from "../cards/dashboardcards"
import { useState } from "react"


export default function BuyZesaForm(){

    const [zigbalance, setZigBalance] = useState(97176)
    const [usdbalance, setUsdBalance] = useState(630)
    const [currency, setCurrency] = useState(0)

    const getUsdBalance = async() => {
        const credentials = 'testz_api_user01:csssbynd'
        var encodedCredentials = base64Encode(utf8.encode(credentials))

        const response = await fetch("https://test.esolutions.co.zw/billpayments/vend",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${encodedCredentials}`,
              },
            body: JSON.stringify({ 
                "mti": "0200",
                "vendorReference": "BAL2023081810163",
                "processingCode": "300000",
                "transmissionDate": "91916182800",
                "vendorNumber": "VE19257147501",
                "accountNumber":"0119257147506",
                "currencyCode":"ZIG"
            })
        })
    }
    return(
        <div className="w-full h-full flex flex-col gap-8">
            <div className="w-full flex items-center justify-end gap-4">
                <DashboardCard value={`ZIG${zigbalance.toFixed(2)}`} product={"ZIG Balance"} />
                <DashboardCard value={`USD${usdbalance.toFixed(2)}`} product={"USD Balance"} />
            </div>
            <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
                <div className="flex items-center gap-2 text-white">
                    <h1 className="text-sm text-white font-semibold">Buy Airtime</h1>
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-8">
                <div className="flex gap-16">
                    <div className="flex gap-4">
                        <h1 className="text-sm font-semibold">Currency:</h1>
                        <div className="flex">
                            <button className={`${currency === "USD"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1 font-semibold`}>
                                    USD
                            </button>
                            <button className={`${currency === "ZiG"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1  font-semibold`}>
                                    ZiG
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <div className="flex w-full gap-2">
                        <div className="flex flex-col">
                            <h1 className="text-xs font-semibold">Amount:</h1>
                            <input className="rounded border border-gray-400 w-96 px-2 py-1"
                                placeholder="amount"
                                onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xs font-semibold">Meter no:</h1>
                            <input className="rounded border border-gray-400 w-96 px-2 py-1"
                                placeholder="Meter Number"
                                onChange={(e) => setMeternumber(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <button className="bg-blue-900 font-semibold text-white w-96 rounded p-1 ">BUY ZESA</button>
                </div>
            </div>
        </div>
    )
}