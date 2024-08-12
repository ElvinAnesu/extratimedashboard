import Header from "@/components/header";
import CollectionsReport from "@/components/tables/reports/collections";



export default function ReportsPage(){
    return( 
        <div className="w-full flex flex-col gap-4">
            <Header title="Reports" />
            <CollectionsReport />
        </div>
    )
}