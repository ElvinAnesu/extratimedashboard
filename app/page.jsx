"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Loader from "@/components/loader"
import AlertDialog from "@/components/dialogs/alertdialog"


export default function Home() {

  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [isloading, setIsloading] = useState(false)
  const [showdialog, setShowdialog] = useState(false)


  const login = async() => { 
    setIsloading(true)
    const res = await fetch("/api/login",{
      method: "POST",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify({
          email,
          password
      })
    })
   
    const data = await res.json()

    if(data.success){
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.user.firstname)
      localStorage.setItem("role", data.user.role)
      localStorage.setItem("useremail", data.user.email)
      localStorage.setItem("userid", data.user._id)
      router.push("/dashboard")
    }else{
      console.log("failed")
      await console.log(data.message)
      await setError(data.message)
      setIsloading(false)
      setShowdialog(true)
    }
  }

  return (
    <main className="min-h-screen max-w-screen flex items-center justify-center bg-gray-200">
      <div className="bg-gray-100 rounded md:w-1/4 p-2 flex flex-col  gap-2 shadow">
        <div className="flex items-center justify-center w-full mt-4">
          <h1 className="text-blue-900 font-semibold text-xl">Extra Time Dashboard</h1>
        </div>
        <form onSubmit={(e) => {e.preventDefault();login()}} className="flex flex-col items-center justify-center gap-4 p-4">
          <input className="h-9 border rounded border-gray-400 w-full p-2 text-black text-sm"
            placeholder="User email"
            type="text"         
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <input className="h-9 border rounded border-gray-400 w-full p-2 text-black text-sm"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required/> 
          <button className="bg-blue-900 p-2 rounded w-full text-white font-semibold text-sm"
            type="submit">
           login
          </button>
        </form>
      </div>
      {isloading && <Loader />}
      {showdialog && <AlertDialog title="Login failed" message={error} onOk={()=> setShowdialog(false)} />}
    </main>
  );
}

