"use client";
import AlertDialog from "@/components/dialogs/alertdialog";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function CreateAdmin(){ 

    const router = useRouter()
    const [surname, setSurname] = useState()
    const [firstname, setFirstname] = useState()
    const [email, setEmail] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [role, setRole] = useState("agent")
    const [location, setLocation] = useState()
    const [supervisor, setSupervisor] = useState()
    const [password, setPassword] = useState()
    const [locations,setLocations] = useState([])
    const [supervisors, setSupervisors] = useState([])
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState()
    const [dialogMsg, setDialogMsg] = useState()

    const getLocations = async() => {
            const res = await fetch("/api/locations",{
                method:"GET",
                headers:{"Content-type":"application/java"}
            })

            const data = await res.json()

            if(data.success){
                setLocations(data.locations)
            }
    }

    const getSupervisors = async()=>{
        const res = await fetch("/api/users/filter",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body : JSON.stringify({
                role:"supervisor"
            })
        })

        const data = await res.json()

        if(data.success){
            setSupervisors(data.users)
        }
    }

   const createUser = async() =>{
        const res = await fetch("/api/users",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({
                surname,
                firstname,
                email,
                phonenumber,
                role,
                location,
                supervisor,
                password,
                locations
            })
        })

        const data = await res.json()

        if(data.success){
            setDialogTitle("Success")
            setDialogMsg(data.message)
            setShowAlertDialog(true)
        }else{
            setDialogTitle("failed")
            setDialogMsg(data.message)
            setShowAlertDialog(true)
        }
   }

   useEffect(()=>{
        getLocations()
        getSupervisors()
   },[])

    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Create New User" />
            <form className="grid grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); createUser()}}>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    placeholder="Surname"
                    type="text"
                    onChange={(e) => setSurname(e.target.value)}v/>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    placeholder="First Name"
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}/>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    placeholder="Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}/>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    placeholder="Phone Number"
                    type="text"
                    onChange={(e) => setPhonenumber(e.target.value)}/>
                <select className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="agent">Agent</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Admin</option>
                </select>

                <div>
                <h1 className="text-xs font-semibold">Next Of Keen Phone Number</h1>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"            
                    placeholder="keen Phone Number"
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}/>
                </div>

                <div>
                <h1 className="text-xs font-semibold">Next of Keen</h1>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"            
                    placeholder="next of keen"
                    type="text"
                    />

                    <h1 className="text-xs font-semibold">Adress</h1>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"            
                    placeholder="Residental Adress"
                    type="text"
                    />

                </div>
                
                <div>
                <h1 className="text-xs font-semibold">Machine Phone Number</h1>
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"            
                    placeholder="Machine Phone Number"
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}/>
                </div>

                {role !== "admin" && role !== "supervisor" &&
                <select className="h-9 border rounded border-gray-400 w-full p-2 text-black">
                    <option>Location</option>
                    {locations.map((_location, i) => (
                        <option value={_location.location} key={1}>{_location.location}</option>
                    ))}
                </select>}
                {role !== "admin" && role !== "supervisor" &&
                    <select className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        onChange={(e)=> {
                                setSupervisor(e.target.value)
                                }}>
                        <option disabled selected>Supervisor</option>
                        {supervisors.map((_supervisor, i) => (
                            <option value={`${_supervisor.firstname} ${_supervisor.surname}-${_supervisor._id}`} key={1}>
                                    {`${_supervisor.firstname} ${_supervisor.surname}`}
                            </option>
                        ))}
                    </select>}
                <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                    placeholder="Password"
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}/>
                 <button className="bg-blue-900 p-2 rounded w-full text-white font-semibold"
                    type="submit">
                    CREATE USER
                </button>
            </form>

            {showAlertDialog && <AlertDialog
                                title={dialogTitle} 
                                message={dialogMsg} 
                                onOk={()=> router.push("/dashboard/users")} />}
        </div>
    )
}