import { CheckCircledIcon, InfoCircledIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons"



export default function DashboardCard({value, product}){ 
    return( 
        <div className="flex rounded shadow flex-col p-4 bg-blue-900 w-full md:w-52 h-24 gap-2 text-white">
            <div className="flex items-center justify-between w-full">
                <div className="bg-blue-300 rounded-full flex items-center justify-center p-2">
                    {product === "Today's Collections" && <QuestionMarkCircledIcon height={14} width={14} />}
                    {product === "Today's Cash ins" && <CheckCircledIcon height={14} width={14} />}
                    {product === "Today's Sales" && <InfoCircledIcon height={14} width={14} />}
                </div>
                <h1 className="text-xl font-semibold">{value}</h1>
            </div>
            <hr className="bg-blue-300"/>
            <div className="flex items-center justify-end">
                <p className="text-sm">{product}</p>
            </div>
        </div>
    )
}