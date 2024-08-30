import Header from "@/components/header"
import SupervisorsTable from "@/components/tables/supervisorstable"



export default function Supervisors(){
    return(
        
        <div className="w-full h-full flex flex-col gap-4 p-2">
            <Header title="Supervisors" />
            <div className=" flex-col gap-4">
                <SupervisorsTable />
            </div>            
        </div>
    )
}