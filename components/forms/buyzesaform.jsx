"use client"

import { useState } from "react"


export default function BuyZesaForm(){

  
    const [currency, setCurrency] = useState("USD")
    const [amount, setAmount] = useState()
    const [meternumber, setMeternumber] = useState()
    const [voucher, setVoucher] = useState()


    
    return(
        <div className="w-full h-full flex flex-col gap-8">
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
                            <button className={`${currency === "USD"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1 font-semibold`}
                                onClick={() => setCurrency("USD")}>
                                    USD
                            </button>
                            <button className={`${currency === "ZiG"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1  font-semibold`}
                                onClick={() => setCurrency("ZiG")}>
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