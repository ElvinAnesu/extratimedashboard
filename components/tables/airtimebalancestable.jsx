"use client"
import { useState, useEffect } from "react"


export default function AirtimeBalancesTable(){

    const [vouchers, setVouchers] = useState([])
    const [usdOneVouchers, setUsdOneVouchers] = useState(0)
    const [usdFiveVouchers, setUsdFiveVouchers] = useState(0)
    const [usdTenVouchers, setUsdTenVouchers] = useState(0)
    const [zigTenVouchers, setZigTenVouchers] = useState(0)
    const [zigTwentyVouchers, setZigTwentyVouchers] = useState(0)
    const [zigFiftyVouchers, setZigFiftyVouchers] = useState(0)
    const [errorMsg, setErrormsg] = useState("")

    const getVouchers = async() => {
        try {
            const res = await fetch("/api/airtimevouchers", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })

            const data = await res.json()

            if (data.success) {
                setVouchers(data.vouchers)
            } else {
                setErrormsg(data.message)
            }
        } catch (error) {
            setErrormsg('Failed to fetch vouchers')
        }
    }

    const getAccounts = async() => {
        try{
            const accounts = await fetch("https://bulkairtime.omnicontact.biz/api/v1/obad/gateway/accounts",{
                method:"GET",
                headers:{
                    "clientid": "API-227HTV-248ZJNP0-07115Z-242YQT-07PX13-15HWNU-1525EK", 
                    "clientsecret": "u7er2lymp8e8laaf526662285a66f2dea", 
                    "apikey": "viqmllymp8e8lb77986d365ef05ab55ee6a3f28448b71f3269f2858616fa42b", 
                    "Content-Type": "application/json"              
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    
    useEffect(() => {
        getVouchers()
        getAccounts()
    }, [])

    useEffect(() => {
        const categorizeVouchers = () => {
            let usdOne = 0
            let usdFive = 0
            let usdTen = 0
            let zigTen = 0
            let zigTwenty = 0
            let zigFifty = 0

            vouchers.forEach(voucher => {
                if (!voucher.sold) {
                    if (voucher.currency === "USD") {
                        if (voucher.amount === 1) {
                            usdOne++
                        } else if (voucher.amount === 5) {
                            usdFive++
                        } else if (voucher.amount === 10) {
                            usdTen++
                        }
                    } else if (voucher.currency === "ZiG") {
                        if (voucher.amount === 10) {
                            zigTen++
                        } else if (voucher.amount === 20) {
                            zigTwenty++
                        } else if (voucher.amount === 50) {
                            zigFifty++
                        }
                    }
                }
            })

            setUsdOneVouchers(usdOne)
            setUsdFiveVouchers(usdFive)
            setUsdTenVouchers(usdTen)
            setZigTenVouchers(zigTen)
            setZigTwentyVouchers(zigTwenty)
            setZigFiftyVouchers(zigFifty)
        }

        categorizeVouchers()
    }, [vouchers])

    return(
        <div className="flex flex-col w-full w-full">
                <div className="flex w-full bg-blue-900 px-4 py-1">
                    <h1 className="text-white font-semibold ">Balances</h1>
                </div>
                <div className="flex w-full bg-blue-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">Vouchers</h1>
                    <h1 className="text-black text-sm font-semibold ">Denominations</h1>
                </div>
                <div className="flex w-full bg-gray-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">USD Vouchers</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">USD 1 Vouchers</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">USD 5 Vouchers</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">USD 10 Vouchers</div>
                    </div>
                </div>
                <div className="flex w-full bg-gray-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">Voucher totals</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{usdOneVouchers*1}</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{usdFiveVouchers*5}</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{usdTenVouchers * 10}</div>
                    </div>
                </div>
                <div className="flex w-full bg-green-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">Gross total</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{(usdOneVouchers*1) + (usdFiveVouchers*5) + (usdTenVouchers * 10)}</div>
                    </div>
                </div>
                <div className="flex w-full bg-gray-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">ZiG Vouchers</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">ZiG 10 Vouchers</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">ZiG 20 Vouchers</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36">ZiG 50 Vouchers</div>
                    </div>
                </div>
                <div className="flex w-full bg-gray-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">Voucher totals</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{zigTenVouchers*10}</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{zigTwentyVouchers * 20}</div>
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{zigFiftyVouchers * 50}</div>
                    </div>
                </div>
                <div className="flex w-full bg-green-200 px-4 py-1 border-b border-white items-center justify-between">
                    <h1 className="text-black text-sm font-semibold ">Gross total</h1>
                    <div className="flex">
                        <div className="border-l border-white px-4 text-sm font-semibold w-36 flex items-center justify-end">{(zigTenVouchers *10) + (zigTwentyVouchers * 20) + (zigFiftyVouchers * 50)}</div>
                    </div>
                </div>

            </div>
    )
}