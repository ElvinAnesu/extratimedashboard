"use client";
import Header from "@/components/header";
import DashboardCard from "@/components/cards/dashboardcards";
import { useEffect, useState } from "react";


export default function SupervisorInfo({ params }) {
  const { _id } = params;
  const [oustandingCollections, setOutstandingCollections] = useState(0);
  const [todaysCollections, setTodaysCollections] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [agents, setAgents] = useState([])
  const [errormsg, setErrormsg] = useState()
  const [fetchingagents, setFetchingagents] = useState(false)
  const [page, setPage] = useState(0)

  const getAgents = async() => {
    setFetchingagents(true)
    const response = await fetch("/api/supervisors/agents",{
      method:"POST",
      headers:{"Content-Type":"appplication/json"},
      body : JSON.stringify({
        supervisor : _id
      })
    })

    const data = await response.json()

    if(data.success){
      setAgents(data.agents)
      setFetchingagents(false)
    }else{
      setErrormsg(data.message)
      setFetchingagents(false)
    }
  }

  const nextpage = () => {

  }

  const prevpage = () => {

  }

  useEffect(()=>{
    getAgents()
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
        {
          fetchingagents? (
            <div className="w-full flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ):( 
            <table className="w-full">
              <tbody>
                <tr className="bg-gray-200 font-semibold text-sm">
                  <td className="border border-white px-1">#</td>
                  <td className="border border-white px-1">Agent name</td>
                  <td className="border border-white px-1">Phone Number</td>
                  <td className="border border-white px-1">Location</td>
                  <td className="border border-white px-1">Machine Number</td>
                  <td className="border border-white px-1">Cash In hand</td>
                  <td className="border border-white px-1">Total Sales</td>
                </tr>
                {agents.map((agent, index)=>(
                  <tr className="text-sm" key={index}>
                    <td className="border border-gray-200 px-1">{index +1}</td>
                    <td className="border border-gray-200 px-1">{`${agent.surname} ${agent.firstname}`}</td>
                    <td className="border border-gray-200 px-1">{agent.phonenumber}</td>
                    <td className="border border-gray-200 px-1">{agent.location}</td>
                    <td className="border border-gray-200 px-1">{agent.machinenumber? agent.machinenumber: ""}</td>
                    <td className="border border-gray-200 px-1"></td>
                    <td className="border border-gray-200 px-1"></td>
                </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
      <div className="w-full flex justify-between items-center mt-4">
            <button onClick={prevpage}  className="px-4 py-2 bg-blue-500 text-white">
              Prev
            </button>
            <span className="text-sm">Page {page}</span>
            <button onClick={nextpage}  className="px-4 py-2 bg-blue-500 text-white">
              Next
            </button>
          </div>
    </div>
  );
}
