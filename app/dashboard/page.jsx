"use client"
import DashboardCard from "@/components/cards/dashboardcards"
import BalancesChart from "@/components/charts/balancesChart"
import LocationPerformance from "@/components/charts/locationsPerformance"
import ServicePerfomancePieChart from "@/components/charts/servicePerfomancePieChart"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"




export default function Dashboard(){
    
    const router = useRouter()
    const [salestoday, setSalestoday] = useState(0)
    const [fetchingsales, setFetchingsales] = useState(false)
    const [cashintoday, setCashintoday] = useState(0)
    const [fetchingcashin, setFetchingcahsin] = useState(false)
    const [collectionstoday, setCollectionstoday] = useState(0)
    const [fetchingcollections, setFetchingcollections] = useState(false)
    const [outstandingcollections, setOutandingcollections] = useState(0)

    //supervisortotals
    const [outsandingdenny, setOutstandingdenny] = useState(0)
    const [collectionstodaydenny, setCollectionstodaydenny] = useState(0)
    const [agentperfomancedenny, setAgentperformancedenny] = useState(0)
    const [outsandingtinashe, setOutstandingtinashe] = useState(0)
    const [collectionstodaytinashe, setCollectionstodaytinashe] = useState(0)
    const [agentperfomancedtinashe, setAgentperformancetinashe] = useState(0)
    const [outsandingjames, setOutstandingjames] = useState(0)
    const [collectionstodayjames, setCollectionstodayjames] = useState(0)
    const [agentperfomancejames, setAgentperformancejames] = useState(0)
    const [outsandingmalcolm, setOutstandingmalcolm] = useState(0)
    const [collectionstodaymalcolm, setCollectionstodaymalcolm] = useState(0)
    const [agentperfomancedmalcolm, setAgentperformancemalcolm] = useState(0)


    const getTodaysSales = async() => {
        setFetchingsales(true)
        const response = await fetch("/api/reports/sales/today",{
            method:"GET",
            headers:{"Content-type":"application/json"}
        })
        var data = await response.json()

        if(data.success){
            setSalestoday(data.todayssales)
            setFetchingsales(false)
        }else{
            setFetchingsales(false)
        }
    }

    const getMalcolmtotals = async(_id) => { 
        const response  = await fetch("/api/airtimetransactions/totals/supervisors",{ 
          method: "POST",
          headers : {"Content-Type":"application/json"},
          body:JSON.stringify({ 
            _id: "6697bec447fe5de2d22ac181"
          })
        })
    
        const data = await response.json()
     
        if(data.success){
          setOutstandingmalcolm(data.pendingtotal)
          setCollectionstodaymalcolm(data.collectionstoday)
          setAgentperformancemalcolm(data.salestotal)
        }
      }

    const getTinashetotals = async(_id) => { 
        const response  = await fetch("/api/airtimetransactions/totals/supervisors",{ 
          method: "POST",
          headers : {"Content-Type":"application/json"},
          body:JSON.stringify({ 
            _id: "66979b5fe49788bca084efb9"
          })
        })
    
        const data = await response.json()
     
        if(data.success){
          setOutstandingtinashe(data.pendingtotal)
          setCollectionstodaytinashe(data.collectionstoday)
          setAgentperformancetinashe(data.salestotal)
        }
      }

    const getDennytotals = async(_id) => { 
        const response  = await fetch("/api/airtimetransactions/totals/supervisors",{ 
          method: "POST",
          headers : {"Content-Type":"application/json"},
          body:JSON.stringify({ 
            _id: "66976ec2dd72ff9a1e177549"
          })
        })
    
        const data = await response.json()
     
        if(data.success){
          setOutstandingdenny(data.pendingtotal)
          setCollectionstodaydenny(data.collectionstoday)
          setAgentperformancedenny(data.salestotal)
        }
      }
    
    const getJamestotals = async(_id) => { 
        const response  = await fetch("/api/airtimetransactions/totals/supervisors",{ 
          method: "POST",
          headers : {"Content-Type":"application/json"},
          body:JSON.stringify({ 
            _id: "6697d1e425e820c65660a6fa"
          })
        })
    
        const data = await response.json()
     
        if(data.success){
          setOutstandingjames(data.pendingtotal)
          setCollectionstodayjames(data.collectionstoday)
          setAgentperformancejames(data.salestotal)
        }
      }  

    const getOutsaningcollections = async()=>{
        const res = await fetch("/api/airtimetransactions/totals",{
          method:"GET",
          headers:{"Content-type":"application/json"}
        })
    
        const data = await res.json()
    
        if(data.success){
          setOutandingcollections(data.pendingsales)
        }
      }
    // check user authentication
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/")
        }
    }, []);

    //fetch inital values
    useEffect(()=>{
        getTodaysSales()
        getMalcolmtotals()
        getTinashetotals()
        getDennytotals()
        getJamestotals()
        getOutsaningcollections()
    },[])

    
    return(
        <div className="flex flex-col gap-8">
            <div className="flex flex-col p-4 gap-4 md:flex-row items-center justify-end gap-4">
            <DashboardCard 
                    value= {`USD${outstandingcollections.toFixed(2)}`}
                    product={"Outstanding Collections"}/>
                <DashboardCard 
                    value= {`USD${(collectionstodaymalcolm + collectionstodaydenny + collectionstodayjames + collectionstodaytinashe).toFixed(2)}`}
                    product={"Today's Collections"}/>
                <DashboardCard
                    value={`USD${cashintoday.toFixed(2)}`}
                    product={"Today's Cash ins"}/>
                <DashboardCard 
                    value={fetchingsales? "loading...":`USD${salestoday.toFixed(2)}`}
                    product={"Today's Sales"}/>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3 w-full h-full gap-4 bg-gray-200 p-4 rounded">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-sm font-semibold text-gray-600">Outstanding Collections</h1>
                    <ServicePerfomancePieChart _labels={["James","Tinashe", "Denny","Malcolm"]} _data={[outsandingjames,outsandingtinashe,outsandingdenny,outsandingmalcolm]}/>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-sm font-semibold text-gray-600">Today&apos;s Collections</h1>
                    <ServicePerfomancePieChart _labels={["James","Tinashe", "Denny","Malcolm"]} _data={[collectionstodayjames, collectionstodaytinashe, collectionstodaydenny,collectionstodaymalcolm]}/>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-sm font-semibold text-gray-600">Agent&apos;s Perfomance</h1>
                    <ServicePerfomancePieChart _labels={["James","Tinashe", "Denny","Malcolm"]} _data={[agentperfomancejames, agentperfomancedtinashe, agentperfomancedenny,agentperfomancedmalcolm]}/>
                </div>
            </div>
        </div>
    )
}