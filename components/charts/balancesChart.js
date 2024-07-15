"use client"
import {Bar} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function BalancesChart(){
    const data = {
        labels: ["USD Airtime sold", "Zig Airtime sold","USD Airtime balance", "Zig Airtime balance",],
        datasets:[
            {
                label:"Airtime",
                data:[12,19, 15, 18],
                backgroundColor:["#040d69","#36a2eb","#040d69","#36a2ee"],
                borderColor: ["#040d69","#36a2eb","#040d69","#36a2ee"],
                borderWidth: 1
            }
        ]
    }
    const options = {
        responsive:true,
        plugins:{
            Legend:{position: "top"},
            tooltip:{enabled:true}
        }
    }
    return(
        <div className="flex w-full h-full shadow rounded p-4">
           <Bar data={data} options={options} />
        </div>
    )
}