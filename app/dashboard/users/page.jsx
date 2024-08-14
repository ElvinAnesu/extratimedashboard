"use client"
import Header from "@/components/header"
import UsersTable from "@/components/tables/userstable"
import { MagnifyingGlassIcon, PlusIcon} from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"



export default function Settings(){ 
    const router = useRouter();
    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Users" />
            
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className=" mb-2 flex gap-2  flex items-center justify-betweeen">
                        <input className="border rounded border-gray-400  py-2 text-black"
                            placeholder="Search"
                            type="text"
                            />
                            
                        <button className="px-4 rounded bg-blue-600 text-white flex gap-2  py-2 flex items-center justify-center">
                            <MagnifyingGlassIcon />
                            Search
                        </button>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-900 rounded p-2 text-white"
                        onClick={()=>router.push("/dashboard/users/createnew")}>
                        <PlusIcon />Add New
                    </button>
                </div>
                <UsersTable />
            </div>
        </div>
    )
}