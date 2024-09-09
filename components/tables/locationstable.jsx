"use client";
import { EyeOpenIcon, TrashIcon} from "@radix-ui/react-icons";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const PAGE_SIZE = 10;

export default function LocationsTable(){ 
    const router=useRouter();

    const [showdialog , setShowdialog] = useState(false)
    const [deletedDialog, setDeletedDialog] = useState(false)
    const [locations, setLocations] = useState([])
    const [dialogTitle, setDialogtitle] = useState()
    const [dialogMsg, setDialogmsg] = useState()
    const [showAlertdialog, setShowAlertDialog] = useState(false)
    const [location, setLocation] = useState()
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchquery] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null);

    const getLocations = async(page=1) => {
        setIsloading(true)
        const res = await fetch(`/api/locations?page=${page}&pageSize=${PAGE_SIZE}&searchQuery=${searchQuery}`,{
            method:"GET",
            headers:{"Content-type":"application/json"},
        })

        const data = await res.json()

        if(data.success){
            setLocations(data.locations)
            setUsers(data.users)
            setTotal(data.total)
            setIsloading(false)
        }
        else{
            setError("Error fetching Locations")
            setIsloading(false)
        }
    };
    const onOk = () => {
        setShowdeletedialog(false);
        window.location.reload();
      };


    useEffect(() => {
        getLocations(page);
      }, [page]);
    
      const handlePreviousPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    
      const handleNextPage = () => {
        if (page * PAGE_SIZE < total) {
          setPage(page + 1);
        }
      };

   
    return( 
        
       <div className="min-w-full max-h-full min-w-full max-h-full min-w-full max-h-full flex flex-col gap-2 overflow-hidden text-sm bg-gray-200 rounded p-4">
            <table className="w-full text-sm">
                <tbody>
                    <tr className="bg-blue-900  text-white">
                        <td className=" px-1">#</td>
                        <td className="px-1">Location</td>
                        <td className="px-1">Action</td>
                    </tr>
                    {locations.map((location, i)=>(
                        <tr className="border boder-b border-b-gray-300" key={i}>
                            <td className="px-1">{i+1}</td>
                            <td className="px-1">{location.location}</td>
                            <td className=" px-1">
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

           
     <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page * PAGE_SIZE >= total}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Next
        </button>
      </div>


            {showdialog && <ConfirmDelete 
                                title="Delete Agent!" 
                                message={`Delete ${location} from locations`}
                                onCancel={()=>setShowdialog(false)}
                                onConfirm={deleteLocation}/>}

            {showAlertdialog && <AlertDialog title={dialogTitle} message={dialogMsg}  onOk={()=> window.location.reload()}/>}
       </div>
    )
}