"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardIcon, PersonIcon, ReaderIcon, GlobeIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons"


export default function Sidebar(){

    const router = useRouter()
    
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
                    <li>
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <DashboardIcon />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/services" className="flex items-center gap-2">
                            <GlobeIcon />
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center gap-2">
                            <ReaderIcon />
                            Reports
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/agents" className="flex items-center gap-2">
                            <PersonIcon />
                            Agents
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/options" className="flex items-center gap-2">
                            <GearIcon />
                            Options
                        </Link>
                    </li>
                    <li>
                        <button onClick={logout} className="flex items-center gap-2">
                            <ExitIcon />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}