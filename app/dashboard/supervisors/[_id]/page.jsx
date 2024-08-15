"use client"
import Header from "@/components/header"
import DashboardCard from "@/components/cards/dashboardcards"
import { useEffect, useState } from "react"
import SupervisorAgentsTable from "@/components/tables/supervisoragentstable"


const PAGE_SIZE = 8

export default function SupervisorInfo({ params }) {
  const { _id } = params;
  const [oustandingCollections, setOutstandingCollections] = useState(0)
  const [todaysCollections, setTodaysCollections] = useState(0)
  const [totalCollections, setTotalCollections] = useState(0)
  const [fetchingtotal, setFetchiingtotal] = useState(false)
  const [supervisorname, setSupervisorname] = useState()

  const getSupervisordetails = async() => {
    const response = await fetch(`/api/users/${_id}`,{
      method: "GET",
      headers:{"Content-type": "application/json"},
    })

    const data = await response.json()

    if(data.success){
      setSupervisorname(`${data.user.firstname} ${data.user.surname}`)
    }
  }


  const getTotal = async() => { 
    setFetchiingtotal(true)
    const response  = await fetch("/api/airtimetransactions/totals/supervisors",{ 
      method: "POST",
      headers : {"Content-Type":"application/json"},
      body:JSON.stringify({ 
        _id: _id
      })
    })

    const data = await response.json()

    if(data.success){
      setTotalCollections(data.totalcollections)
      //setTodaysCollections(data.collectionstoday)
      setOutstandingCollections(data.pendingtotal)
      setFetchiingtotal(false)
    }else{
      setFetchiingtotal(false)
    }  
  }

  useEffect(()=>{
    getSupervisordetails()
    getTotal()
  },[])

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Header title={`${supervisorname? supervisorname : ""} analytics`} />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full gap-4 justify-end">
          <DashboardCard value={fetchingtotal? "Fetching..." : `USD${oustandingCollections.toFixed(2)}`} product={"Outstanding Collections"} />
          <DashboardCard value={fetchingtotal? "Fetching ...": `USD${todaysCollections.toFixed(2)}`} product={"Today's Collections"} />
          <DashboardCard value={fetchingtotal ? "Fetching..." : `USD${totalCollections.toFixed(2)}`} product={"Total Collections"} />
        </div>
        <SupervisorAgentsTable supervisor={_id} />
      </div>      
    </div>
  );
}
