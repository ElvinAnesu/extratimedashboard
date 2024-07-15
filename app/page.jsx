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
      <div className="bg-white rounded-lg w-3/4 p-16 grid grid-cols-2 gap-16">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="logo" />
        </div>
        <form onSubmit={(e) => {e.preventDefault();login()}} className="flex flex-col items-center justify-center gap-4 p-8">
          <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
            placeholder="User email"
            type="text"         
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <input className="h-9 border rounded border-gray-400 w-full p-2 text-black"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required/> 
          <button className="bg-blue-900 p-2 rounded w-full text-white font-semibold"
            type="submit">
            LOGIN
          </button>
        </form>
      </div>
      {isloading && <Loader />}
      {showdialog && <AlertDialog title="Login failed" message={error} onOk={()=> setShowdialog(false)} />}
    </main>
  );
}

