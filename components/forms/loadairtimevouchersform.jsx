import { UploadIcon } from "@radix-ui/react-icons"

export default function LoadAirtimeVouuchersForm(){
    return(
        <div className="w-full h-full flex flex-col gap-8">
            <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
                <div className="flex items-center gap-2 text-white">
                    <UploadIcon />
                    <h1 className="text-sm text-white font-semibold">Load Airtime Vouchers</h1>
                </div>
            </div>
            <input className="border border-gray-500 rounded max-w-96"
                type="file"  />
            <button className="rounded max-w-96 p-2 bg-blue-900 text-white font-semibold">Submit</button>
        </div>
    )
}