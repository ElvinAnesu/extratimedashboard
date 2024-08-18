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
                        <input className="border rounded border-gray-400  py-1 px-2 text-sm text-black"
                            placeholder="search"
                            type="text"
                            />   
                        <button className="px-2 rounded bg-blue-600 text-white flex gap-1  py-1 px-2 text-sm flex items-center justify-center">
                            <MagnifyingGlassIcon />
                            Search
                        </button>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-900 rounded px-2 py-1 text-white"
                        onClick={()=>router.push("/dashboard/users/createnew")}>
                        <PlusIcon />Add New
                    </button>
                </div>
                <UsersTable />
            </div>
        </div>
    )
}