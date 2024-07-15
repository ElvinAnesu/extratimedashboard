"use client"
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function LocationPerformance(){
    const data = {
        labels: ["CBD", "Mbare", "Avondale","Borrowdale", "Belvedere"],
        datasets:[
            {
                label:"USD Sales",
                data:[12,19,56,49,20],
                backgroundColor:["#040d69","#36a2eb", "#ADD8E6","#0000CD","#00008B"],
                borderColor: ["#040d69","#36a2eb",, "#ADD8E6","#0000CD","#00008B"],
                borderWidth: 1
            }
        ]
    }
    const options = {
        responsive:true,
        plugins:{
            Legend:{position: "left"},
            tooltip:{enabled:false}
        }
    }
    return(
        <div className="flex w-full h-full shadow rounded p-4">
           <Pie data={data} options={options} />
        </div>
    )
}