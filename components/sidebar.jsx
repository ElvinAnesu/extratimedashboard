"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { DashboardIcon, PersonIcon, ReaderIcon, GlobeIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"


export default function Sidebar(){

    const router = useRouter()
    const pathname = usePathname()
    
  
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("role")
        localStorage.removeItem("useremail")
        localStorage.removeItem("userid")
        router.push("/")
      }
    return( 
        <div className="flex flex-col p-4 rounded gap-4 bg-blue-900">
            <div className="flex items-center justify-center bg-white rounded">
                <img src="/logo.png" alt="logo" height="100" />
            </div>
            <div>
                <ul className="text-white flex flex-col gap-4">
                    <li className= {`${pathname === "/dashboard"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <DashboardIcon />
                            Dashboard
                        </Link>
                    </li>
                    <li className= {`${pathname === "/dashboard/services"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard/services" className="flex items-center gap-2">
                            <GlobeIcon />
                            Services
                        </Link>
                    </li>
                    <li className= {`${pathname === "/dashboard/reports"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard/reports" className="flex items-center gap-2">
                            <ReaderIcon />
                            Reports
                        </Link>
                    </li>
                    <li className= {`${pathname === "/dashboard/agenttransactions"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard/agenttransactions" className="flex items-center gap-2">
                            <PersonIcon />
                            Agents    
                        </Link>
                    </li>
                    <li className= {`${pathname === "/dashboard/supervisors"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard/supervisors" className="flex items-center gap-2">
                            <PersonIcon />
                           Supervisors
                        </Link>
                    </li>
                    <li className= {`${pathname === "/dashboard/options"? "bg-blue-300 rounded p-1 text-black" : ""} hover:bg-blue-100 hover:rounded p-1 hover:text-black`}>
                        <Link href="/dashboard/options" className="flex items-center gap-2">
                            <GearIcon />
                            Options
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout} className="w-full flex items-center gap-2 hover:bg-blue-100 hover:rounded p-1 hover:text-black">
                            <ExitIcon />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}