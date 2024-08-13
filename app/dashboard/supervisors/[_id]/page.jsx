"use client";
import Header from "@/components/header";
import DashboardCard from "@/components/cards/dashboardcards";
import { useEffect, useState } from "react";
import SupervisorAgentsTable from "@/components/tables/supervisoragentstable";


const PAGE_SIZE = 8

export default function SupervisorInfo({ params }) {
  const { _id } = params;
  const [oustandingCollections, setOutstandingCollections] = useState(0);
  const [todaysCollections, setTodaysCollections] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);

  const getTotal = async() => { 
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
    }  
  }

  useEffect(()=>{
    getTotal()
  },[])

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Header title="Supervisor Analytics" />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full gap-4 justify-end">
          <DashboardCard value={`USD${oustandingCollections.toFixed(2)}`} product={"Outstanding Collections"} />
          <DashboardCard value={`USD${todaysCollections.toFixed(2)}`} product={"Today's Collections"} />
          <DashboardCard value={`USD${totalCollections.toFixed(2)}`} product={"Total Collections"} />
        </div>
        <SupervisorAgentsTable supervisor={_id} />
      </div>      
    </div>
  );
}
