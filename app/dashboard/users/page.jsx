"use client"
import Header from "@/components/header"
import UsersTable from "@/components/tables/userstable"

export default function Settings(){ 
    return(
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Users" />
            <div className="flex flex-col gap-4">
                <UsersTable />
            </div>
        </div>
    )
}