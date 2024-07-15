import { ValueIcon} from "@radix-ui/react-icons"



export default function DashboardCard({value, product}){ 
    return( 
        <div className="flex rounded shadow flex-col p-4 bg-gray-100 w-52 h-24 gap-2">
            <div className="flex items-center justify-between w-full">
                <div className="bg-green-200 rounded-full flex items-center justify-center p-2">
                    <ValueIcon height={14} width={14} />
                </div>
                <h1 className="text-xl font-semibold">{value}</h1>
            </div>
            <hr />
            <div className="flex items-center justify-end">
                <p className="text-sm">{product}</p>
            </div>
        </div>
    )
}