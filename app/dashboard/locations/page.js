"use client"
import AlertDialog from "@/components/dialogs/alertdialog"
import Header from "@/components/header"
import LocationsTable from "@/components/tables/locationstable"
import { PlusIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Locations(){

    const router = useRouter()
    const [addLocationForm, setAddlocationForm] = useState(false)
    const [location, setLocation] = useState()
    const [dialogTitle, setDialogtitle] = useState()
    const [dialogMsg, setDialogmsg] = useState()
    const [showDialog, setShowdialog] = useState()

    const addLocation = async() => {
        const res = await fetch("/api/locations",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body : JSON.stringify({
                location
            })
        })

        const data = await res.json()

        if(data.success){
            setDialogtitle("Success")
            setDialogmsg(data.message)
            setShowdialog(true)
        }else{
            setDialogtitle("Failed")
            setDialogmsg(data.message)
            setShowdialog(true)
        }
    }

    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Locations" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <div>
                        {addLocationForm && <form className="flex gap-2" onSubmit={(e) => {e.preventDefault(); addLocation()}}>
                                <input className="border border-gray-400 rounded px-2"
                                    placeholder="Enter Location"
                                    onChange={(e)=>setLocation(e.target.value)}
                                    required/>
                                <button className="px-4 rounded bg-blue-900" type="submit">Submit</button>
                            </form>}
                   </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-900 rounded p-2 text-white"
                        onClick={()=>setAddlocationForm(true)}>
                        <PlusIcon />Add New
                    </button>
                </div>
            </div>
            <LocationsTable />

            {showDialog && <AlertDialog title={dialogTitle} message={dialogMsg} onOk={()=>{window.location.reload()}} />}
        </div>
    )
}