"use client"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { Pencil2Icon, LockClosedIcon } from "@radix-ui/react-icons"
import AlertDialog from "@/components/dialogs/alertdialog"
import ResetPinDialog from "@/components/dialogs/resetpindialog"


export default function ViewAdmin({params}){ 

    const {_id} = params
    const [surname, setSurname] = useState()
    const [firstname, setFirstname] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [email, setEmail] = useState()
    const [role, setRole] = useState()
    const [supervisor, setSupervisor] = useState()
    const [location, setLocation] = useState()
    const [locations, setLocations] = useState([])
    const [supervisors,setSupervisors] = useState([])
    const [edit, setEdit] = useState(true)
    const [showdialog, setShowdialog] = useState(false)
    const [dialogtitle, setDialogtitle] = useState()
    const [dialogmsg, setDialogmsg] = useState()
    const [address, setAddress] = useState()
    const [machinephone, setMachinephone] = useState()
    const [nextofkin, setNextofkin] = useState()
    const [nextofkinphone, setNnextofkinphone] = useState()
    const [isactive, setIsactive] = useState(false)


    const getUser = async() => {
        const res = await fetch(`/api/users/${_id}`,{
            method: "GET",
            headers:{"Content-type":"application/json"}
        })

        const data = await res.json()

        if(data.success){

            console.log("status:" )
            setSurname(data.user.surname)
            setFirstname(data.user.firstname)
            setPhonenumber(data.user.phonenumber)
            setEmail(data.user.email)
            setRole(data.user.role)
            setSupervisor(data.user.supervisor)
            setLocation(data.user.location)
            setAddress(data.user.address)
            setNextofkin(data.user.nextofkin)
            setMachinephone(data.user.machinenumber)
            setNnextofkinphone(data.user.nextofkinphonenumber)
            setIsactive(data.user.active)
        }
    }

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

    const editUser = () => {
        setEdit(!edit)
    }

    const updateUser = async() => {
        const res = await fetch(`/api/users/${_id}`,{
            method: "PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({
                surname : surname,
                firstname: firstname,
                phonenumber: phonenumber,
                email:email,
                role: role,
                supervisor: supervisor,
                location:location,
                address:address,
                nextofkin:nextofkin,
                nextofkinphonenumber:nextofkinphone,
                active:isactive,
                machinenumber:machinephone
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

    const onOk = () => {
        setShowdialog(false)
        window.location.reload()
    }

    useEffect(()=>{
        getUser()
        getLocations()
        getSupervisors()
    },[])
     

    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="User Profile" />
            <div className="flex items-center gap-4 justify-end">
                <button className="flex items-center justify-center gap-2 bg-blue-900 rounded p-2 text-white"
                    onClick={editUser}>
                    <Pencil2Icon />Edit
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-900 rounded p-2 text-white"
                    onClick={()=> router.push("/dashboard/users/resetpin")}>
                    <LockClosedIcon />Reset Pin
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Surname</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Surname"
                        type="text"
                        value={surname}
                        disabled={edit}
                        onChange={(e) => setSurname(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">First Name</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="First Name"
                        type="text"
                        value={firstname}
                        disabled={edit}
                        onChange={(e) => setFirstname(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Email</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Email"
                        type="text"
                        value={email}
                        disabled={edit}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Account Status</h1>
                    {edit? <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Phone Number"
                        type="text"
                        value={isactive? "Active" : "Inactive"}
                        disabled={edit}
                        onChange={(e) => setPhonenumber(e.target.value)}/>:
                    <select className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        value={isactive}
                        onChange={(e) => setIsactive(e.target.value)}>
                        <option value={true}>Activate</option>
                        <option value={false}>Deactivate</option>
                    </select>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Phone Number</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Phone Number"
                        type="text"
                        value={phonenumber}
                        disabled={edit}
                        onChange={(e) => setPhonenumber(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Role</h1>
                    {edit? <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Phone Number"
                        type="text"
                        value={role}
                        disabled={edit}/>:
                    <select className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value="agent">Agent</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="admin">Admin</option>
                    </select>}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Machine Phone Number</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Phone Number"
                        type="text" 
                        disabled={edit}
                        value={machinephone}
                        onChange={(e) => setMachinephone(e.target.value)}
                        />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Adress</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Residental adress"
                        type="text" 
                        disabled={edit}
                        value={address}
                        onChange={(e) =>  setAddress(e.target.value)}
                        />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Next Of Kin</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Next of Kin"
                        type="text" 
                        disabled={edit}
                        value={nextofkin}
                        onChange={(e) => setNextofkin(e.target.value)}
                        />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-xs font-semibold">Next Of Kin Phone Number</h1>
                    <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                        placeholder="Phone Number"
                        type="text" 
                        disabled={edit}
                        value={nextofkinphone}
                        onChange={(e) => setNnextofkinphone(e.target.value)}
                        />
                </div>
                {role === "agent" &&
                    <div className="flex flex-col gap-2 w-full">
                        <h1 className="text-xs font-semibold">Supervisor</h1>
                        {edit? <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                            placeholder="Supervisor"
                            type="text"
                            value={supervisor}
                            disabled/> :
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
                    </div>}
                {role === "agent" &&
                    <div className="flex flex-col gap-2 w-full">
                        <h1 className="text-xs font-semibold">Location</h1>
                        {edit? <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                            placeholder="Location"
                            type="text"
                            value={location}
                            disabled
                            />:
                            <select className="h-9 border rounded border-gray-400 w-full p-2 text-black"
                                onChange={(e)=> setLocation(e.target.value)}>
                                <option>Location</option>
                                {locations.map((_location, i) => (
                                    <option value={_location.location} key={1}>{_location.location}</option>
                                ))}
                            </select>}
                    </div>}
                <div></div>
                {!edit &&  <button className="bg-blue-900 p-2 rounded w-full text-white font-semibold"
                            onClick={updateUser}>
                            UPDATE USER
                        </button>}
            </div>

            {showdialog && <AlertDialog title={dialogtitle} message={dialogmsg} onOk={onOk}/>}
            {/* <ResetPinDialog /> */}
        </div>
    )
}