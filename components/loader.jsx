import { Spinner } from "@nextui-org/spinner"


export default function Loader(){
    return(
        <div className="absolute top-0 left-0 w-full h-full flex flex-col bg-black opacity-95 items-center justify-center">
            <div className="flex flex-col">
                <Spinner label="Loading" color="success" labelColor="success"/>
            </div>
        </div>
    )
}