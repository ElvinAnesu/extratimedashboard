import Header from "@/components/header";



export default function ReportsPage(){
    return( 
        <div className="w-full flex flex-col gap-4">
            <Header title="Reports" />
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <h1>Report:</h1>
                    <select className="border border-gray-200 rounded px-2">
                        <option>Sales</option>
                        <option>Collections</option>
                    </select>
                </div>
                <div className="flex gap-8">
                    <div className="flex gap-4">
                        <h1>Start Date:</h1>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="border border-gray-300 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4">
                        <h1>End Date:</h1>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="border border-gray-300 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button className="px-4 py-1 rounded bg-blue-900 text-white">Execute</button>
            </div>
        </div>
    )
}