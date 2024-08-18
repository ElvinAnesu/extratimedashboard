"use client"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)


export default function ServicePerfomancePieChart({_labels, _data}){
    
    const data = {
        labels: _labels,
        datasets:[
            {
                label:"Amount",
                data:_data,
                backgroundColor:["#040d69","#36a2eb", "#3F00FF", "#1F51FF"],
                borderColor: ["#040d69","#36a2eb","#3F00FF", "#1F51FF"],
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
           <Doughnut data={data} options={options} />
        </div>
    )
}