"use client";
import { EyeOpenIcon, TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";


export default function UsersTable(){ 

    const router = useRouter();

    const [showdialog, setShowdialog] = useState(false)
    const [showDeletedialog, setShowdeletedialog] = useState(false);
    const [users, setUsers] = useState([])
    const [error, setError] = useState()
    const [deleteuser, setDeleteuser] = useState()
    const [deletedialogtitle,setDeletedialogtitle] = useState()
    const [deletedialogmsg, setDeletedialogmsg] = useState()

    const viewUser = (_id) => {
        router.push(`/dashboard/users/${_id}`);
    }
    const confirmDelete = (_id) => {
        setDeleteuser(_id)
        setShowdialog(true)
    }

    const deleteUser = async() => {
        const res = await fetch(`/api/users/${deleteuser}`,{
            method:"DELETE",
            headers:{"Content-type":"application/json"}
        })
        
        const data = await res.json()

        if(data.success){
            setDeletedialogtitle("Success")
            setDeletedialogmsg(data.message)
            setShowdeletedialog(true)
        }else{
            setDeletedialogtitle("Failed")
            setDeletedialogmsg(data.message)
            setShowdeletedialog(true)
        }
    }

    const getUsers = async() => {
        const res = await fetch("/api/users",{
            method:"GET",
            headers:{"Content-type":"application/json"}
        })
        
        const data = await res.json()

        if(data.success){
            setUsers(data.users)
        }else{
            setError("Error fetching users")
        }
    }

    const onOk = () => {
        setShowdeletedialog(false)
        window.location.reload()
    }

    useEffect(()=>{
        getUsers()
    },[])

    return( 
       <div className="min-w-full max-h-full overflow-hidden">
            <table className="w-full">
                <tbody>
                    <tr className="bg-gray-200">
                        <td className="border border-white p-1">#</td>
                        <td className="border border-white p-1">Surname</td>
                        <td className="border border-white p-1">First Name</td>
                        <td className="border border-white p-1">Role</td>
                        <td className="border border-white p-1">Email</td>
                        <td className="border border-white p-1">Phone Number</td>
                        <td className="border border-white p-1">Action</td>
                    </tr>
                    {users.map((user, i)=>(
                        <tr className="" key={i}>
                            <td className="border-b border p-1">{i+1}</td>
                            <td className="border-b border p-1">{user.surname}</td>
                            <td className="border-b border p-1">{user.firstname}</td>
                            <td className="border-b border p-1">{user.role}</td>
                            <td className="border-b border p-1">{user.email}</td>
                            <td className="border-b border p-1">{user.phonenumber}</td>
                            <td className="border-b border p-1">
                                <div className="flex gap-2 items-center">
                                    <button className="bg-blue-600 p-1 rounded flex items-center justify-center text-white"
                                        onClick={() => viewUser(user._id)}>
                                        <EyeOpenIcon />
                                    </button>
                                    <button className="bg-red-600 p-1 rounded flex items-center justify-center text-white"
                                        onClick={() => confirmDelete(user._id)}>
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
                                title="Delete Administrator!" 
                                message="Are you sure you want to delete this administrator?"
                                onCancel={()=>setShowdialog(false)}
                                onConfirm={deleteUser}/>}

            {showDeletedialog && <AlertDialog title={deletedialogtitle} message={deletedialogmsg} onOk={onOk}/>}
       </div>
    )
}