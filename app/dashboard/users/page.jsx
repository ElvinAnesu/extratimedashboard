"use client"
import Header from "@/components/header"
import UsersTable from "@/components/tables/userstable"
import { PlusIcon} from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"



export default function Settings(){ 
    const router = useRouter();
    return(
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Users" />
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-end">
                    <button className="flex items-center justify-center gap-2 bg-blue-900 rounded p-2 text-white"
                        onClick={()=>router.push("/dashboard/users/createnew")}>
                        <PlusIcon />Add New
                    </button>
                </div>
                <UsersTable />3
            </div>
        </div>
    )
}