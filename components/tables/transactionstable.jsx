"use client"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import moment from "moment"
import DashboardCard from "../cards/dashboardcards"

export default function TransactionTable(){

    const [transactions, setTransactions] = useState([])
    const [totalSales, setTotalSales] = useState(0)
    const [pendingSales, setPendingSales] = useState(0)
    const [clearedSales, setClearedSales] = useState(0)
    const [errorMsg, setErrormsg] = useState()

    const getTransactions = async() => {
        const res = await fetch("/api/transactions",{
            method: "GET",
            headers:{"Content-type":"application/json"}
        })

        const data = await res.json()

        if(data.success){
            setTransactions(data.transactions)
            console.log(transactions)
        }else{
            setErrormsg(data.message)
        }
    }

    useEffect(()=>{
        getTransactions()
    },[])

    useEffect(()=>{
        const calculateSales = () => {
            var _clearedsales = 0;
            var _pendingsales = 0;
            transactions.forEach(transaction => {
                if(transaction.cleared){
                    _clearedsales = _clearedsales + transaction.extras.amount
                }else{
                    _pendingsales = _pendingsales + transaction.extras.amount
                }
            });
            setClearedSales(_clearedsales)
            setPendingSales(_pendingsales)
            setTotalSales(_clearedsales+_pendingsales)
        }
        calculateSales()
    }, [transactions])
    return(
        <div className="w-full h-full flex flex-col">
            <div className="flex w-full justify-end gap-8 mb-4">
                <DashboardCard 
                        value= {`USD${pendingSales.toFixed(2) }`}
                        product={"Pending Sales"}/>
                    <DashboardCard 
                        value={`USD${clearedSales.toFixed(2)}`}
                        product={"Cleared Sales"}/>
                    <DashboardCard
                        value={`USD${totalSales.toFixed(2)}`}
                        product={"Total Sales"}/>
            </div>
            <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
                <h1 className="text-sm text-white font-semibold">Transactions</h1>
                <button className="text-sm text-white flex items-center gap-2"
                    onClick={getTransactions}>
                    <ReloadIcon />
                    Refresh
                </button>
            </div>
            <table>
                <tbody>
                    <tr className="bg-blue-200 font-semibold text-sm py-1">
                        <td className="px-4">Transaction</td>
                        <td className="px-4">Currency</td>
                        <td className="px-4">Amount</td>
                        <td className="px-4">Executed by</td>
                        <td className="px-4">Cleared</td>
                        <td className="px-4">Time</td>
                    </tr>
                    {transactions.map((transaction, i)=> (
                        <tr className="bg-gray-200 font-semibold text-xs py-1 border-b border-white" key={i}>
                            <td className="px-4">{transaction.transaction}</td>
                            <td className="px-4">{transaction.currency}</td>
                            <td className="px-4">{transaction.amount}</td>  
                            <td className="px-4">{transaction.username}</td>
                            <td className={`px-4 ${(transaction.cleared) === true ? "text-green-600" : "text-amber-600"}`}>{(transaction.cleared) === true ? "Cleared" : "Pending"}</td>
                            <td className="px-4">{transaction.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
}