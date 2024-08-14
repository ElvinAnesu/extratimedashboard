import Header from "@/components/header"
import SupervisorsTable from "@/components/tables/supervisorstable"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"


export default function Supervisors(){
    return(
        
        <div className="w-full h-full flex flex-col gap-4">
            <Header title="Supervisors" />
            <div className=" flex-col gap-4">
            <div className=" mb-4 flex gap-2  gap-2 flex items-center justify-end">
                        <input className="border rounded border-gray-400  px-2 text-black"
                            placeholder="Search"
                            type="text"
                            />
                        <button className="px-4 rounded bg-blue-600 text-white flex gap-2 flex items-center justify-center">
                            <MagnifyingGlassIcon />
                            Search
                        </button>
                    </div>
                <SupervisorsTable />
            </div>

            
        </div>
    )
}