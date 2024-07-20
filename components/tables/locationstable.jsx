"use client";
import { EyeOpenIcon, TrashIcon} from "@radix-ui/react-icons";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";
import { useEffect, useState } from "react";



export default function LocationsTable(){ 

    const [showdialog , setShowdialog] = useState(false)
    const [deletedDialog, setDeletedDialog] = useState(false)
    const [locations, setLocations] = useState([])
    const [dialogTitle, setDialogtitle] = useState()
    const [dialogMsg, setDialogmsg] = useState()
    const [showAlertdialog, setShowAlertDialog] = useState(false)
    const [location, setLocation] = useState()

    const getLocations = async() => {
        const res = await fetch("http://localhost:3000/api/locations",{
            method:"GET",
            headers:{"Content-type":"application/json"},
        })

        const data = await res.json()

        if(data.success){
            setLocations(data.locations)
        }
    }

    const deleteLocation = async() => {
        const res = await fetch(`http://localhost:3000/api/locations/${location}`,{
            method:"DELETE",
            headers:{"Content-type":"application/json"}
        })

        const data = await res.json()

        if(data.success){
            setDialogtitle("Success")
            setDialogmsg(data.message)
            setShowAlertDialog(true)
        }else{
            setDialogtitle("Failed")
            setDialogmsg("Operation Failed")
            setShowAlertDialog(true)
        }
    }

    useEffect(()=>{
        getLocations()
    },[])

    return( 
       <div className="min-w-full max-h-full overflow-hidden">
            <table className="w-full text-sm">
                <tbody>
                    <tr className="bg-gray-200">
                        <td className="border border-white px-1">#</td>
                        <td className="border border-white px-1">Location</td>
                        <td className="border border-white px-1">Action</td>
                    </tr>
                    {locations.map((location, i)=>(
                        <tr className="" key={i}>
                            <td className="border-b border px-1">{i+1}</td>
                            <td className="border-b border px-1">{location.location}</td>
                            <td className="border-b border px-1">
                                <div className="flex gap-2 items-center justify-center">
                                    <button className="bg-red-600 px-1 rounded flex items-center justify-center"
                                        onClick={() => {setLocation(location.location);setShowdialog(true)}}>
                                        <TrashIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )    
                    )}
                </tbody>
            </table>


            {showdialog && <ConfirmDelete 
                                title="Delete Agent!" 
                                message={`Delete ${location} from locations`}
                                onCancel={()=>setShowdialog(false)}
                                onConfirm={deleteLocation}/>}

            {showAlertdialog && <AlertDialog title={dialogTitle} message={dialogMsg}  onOk={()=> window.location.reload()}/>}
       </div>
    )
}