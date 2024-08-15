import { Spinner } from "@nextui-org/spinner"


export default function Loader(){
    return(
        <div className="absolute top-0 left-0 w-full h-full flex flex-col bg-black opacity-50 items-center justify-center">
            <div className="flex flex-col">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </div>
    )
}