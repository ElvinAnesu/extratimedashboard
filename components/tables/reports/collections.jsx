"use client"
import { ReloadIcon, DownloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"



export default function CollectionsReport(){

    const [report, setReport] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [startdate, setStartdate] = useState()
    const [enddate,setEnddate] = useState()

    const getReport = async() =>  {
        setIsloading(true)
        const result = await fetch("/api/reports/collections",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                startdate:startdate,
                enddate:enddate   
            })
        })

        const data = await result.json()

        if(data.success){
           setReport(data.report)
           setIsloading(false)
        }else{
            setIsloading(false)
        }        
    }

    const getAlltimereport = async() => {
        setIsloading(true)
        const result = await fetch("/api/reports/collections",{
            method:"GET",
        })

        const data = await result.json()

        if(data.success){
           setReport(data.report)
           setIsloading(false)
        }else{
            setIsloading(false)
        }
    }
    useEffect(()=>{
        getAlltimereport()
    },[])
    
    return ( 
    <div className="w-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
                <h1>Report:</h1>
                <select className="border border-gray-200 rounded px-2">
                    <option>Collections</option>     
                </select>
            </div>
            <div className="flex gap-8">
                <div className="flex gap-4">
                    <h1>Start Date:</h1>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="border border-gray-300 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=> setStartdate(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1>End Date:</h1>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="border border-gray-300 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=> setEnddate(e.target.value)}
                    />
                </div>
            </div>
            <button className="px-4 py-1 rounded bg-blue-900 text-white"
                onClick={getReport}>Execute</button>
        </div>
        <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
            <h1 className="text-sm text-white font-semibold">Collected Cash Report</h1>
            <button className="text-sm text-white flex items-center gap-2" onClick={() =>{}}>
            <DownloadIcon />
            Export
            </button>
      </div>
      { isloading ? 
        <div className="flex w-full h-full items-center justify-center p-8">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>:
        <table>
            <tbody>
            <tr className="bg-blue-200 font-semibold text-sm py-1">
                <td className="px-4">Supervisor</td>
                <td className="px-4 ">Collected Amount(USD)</td>
                <td className="px-4 ">Collected Amount(ZIG)</td>
                <td className="px-4">Period</td>
            </tr>
            {report.map((record, index)=> ( 
                <tr className="bg-gray-200 font-semibold text-xs py-1 border-b border-white" key={index}>
                    <td className="px-4 flex">{record.supervisorname}</td>
                    <td className="px-4">{record.usdcollected.toFixed(2)}</td>
                    <td className="px-4">{record.zigcollected.toFixed(2)}</td>
                    <td className="px-4">{`${startdate} to ${enddate}`}</td>
                </tr>
            ))}
            </tbody>
        </table>
        }
    </div>
    )
} 