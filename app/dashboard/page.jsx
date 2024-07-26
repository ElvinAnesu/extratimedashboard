"use client"
import DashboardCard from "@/components/cards/dashboardcards"
import BalancesChart from "@/components/charts/balancesChart"
import LocationPerformance from "@/components/charts/locationsPerformance"
import ServicePerfomancePieChart from "@/components/charts/servicePerfomancePieChart"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"



export default function Dashboard(){
    
    const router = useRouter()
    const [transactions, setTransactions] = useState([])
    const [usdAirtimeSales, setUsdairtimeSales] = useState(0)
    const [zigAirtimeSales, setZigAirtimeSales] = useState(0)
    const [zigZesaSales, setZigZesaSales] = useState(0)
    const [usdZesaSales, setUsdZesaSales] = useState(0)


    const getSales = async() => {
        const res = await fetch("/api/transactions",{
            method: "GET",
            headers:{"Content-type":"application/json"}
        })

        const data = await res.json()
        if(data.success){
            setTransactions(data.transactions)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }
    });

    useEffect(()=>{
        getSales()
    },[])

    useEffect(()=>{
        
        const calculateBalances = () => {
            let zesaUsd = 30
            let zesaZig = 40
            let airtimeUsd = 0
            let airtimeZig = 0

            transactions.forEach(transaction => {
                if(transaction.issuccessful){
                    console.log("we de de")
                    console.log(transaction)
                    if(transaction.transaction === "airtime-voucher"){
                        if(transaction.currency === "USD"){
                            airtimeUsd = airtimeUsd + Number(transaction.amount)
                        }if(transaction.currency === "ZiG"){
                            airtimeZig = airtimeZig + Number(transaction.amount)
                        }
                    }else if(transaction.transaction === "zesa-voucher"){
                        if(transaction.currency === "USD"){
                            zesaUsd = zesaUsd + Number(transaction.amount)
                        }if(transaction.currency === "ZiG"){
                            zesaZig = zesaZig + Number(transaction.amount)
                        }
                    }
                }
            })

            setUsdZesaSales(zesaUsd)
            setZigZesaSales(zesaZig)
            setUsdairtimeSales(airtimeUsd)
            setZigAirtimeSales(airtimeZig)
        }
        calculateBalances()
    },[transactions])

    return(
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <DashboardCard 
                    value= {`USD${usdAirtimeSales.toFixed(2)}`}
                    product={"usd airtime daily sales"}/>
                <DashboardCard 
                    value={`ZiG${zigAirtimeSales.toFixed(2)}`}
                    product={"ZiG airtime daily sales"}/>
                <DashboardCard
                    value={`USD${usdZesaSales.toFixed(2)}`}
                    product={"USD ZESA daily sales"}/>
                <DashboardCard 
                    value={`ZiG${zigZesaSales.toFixed(2)}`}
                    product={"ZiG ZESA daily sales"}/>
            </div>
            <div className="grid grid-cols-3 w-full h-full gap-4">
                <ServicePerfomancePieChart _labels={["Airtme", "Zesa"]} _data={[usdAirtimeSales,usdZesaSales]}/>
                <ServicePerfomancePieChart _labels={["Airtme", "Zesa"]} _data={[zigAirtimeSales, zigZesaSales]}/>
                <LocationPerformance />
                <LocationPerformance />
                <div className="col-span-2">
                    <BalancesChart />
                </div>
            </div>
        </div>
    )
}