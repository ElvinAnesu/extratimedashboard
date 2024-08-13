import Airtimetransaction from "@/app/models/airtimetransaction"
import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user";

export async function GET(params) {

    let report = []
     
     try{
        connectdb()
        // step one fetch all supervisors
        const supervisors = await User.find({role:"supervisor"})

        console.log(supervisors)
        // get suppervisor totals
        for(const supervisorindex in supervisors){
            const supervisor = supervisors[supervisorindex]
            console.log("current supervisor")
            console.log(supervisor)
            const transactions = await Airtimetransaction.find({issuccessful: true, cleared:true, clearedby: supervisor._id})

            var zigtotal = 0
            var usdtotal = 0

            transactions.forEach(transaction => {
                if(transaction.extras.currency === "USD"){
                    usdtotal = usdtotal + transaction.extras.amount
                }else if(transaction.extras.currency === "ZIG"){
                    zigtotal = zigtotal + transaction.extras.amount
                }
            });

            report.push({
                supervisorid: supervisor._id,
                supervisorname: `${supervisor.surname} ${supervisor.firstname}`,
                usdcollected: usdtotal,
                zigcollected: zigtotal
            })
        }

        return NextResponse.json({ 
            success: true,
            message:"Transactions fetched successfully",
            report
        })

     }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while fetching transactions"
        })
     }
}

export async function POST(req) {
    
    const {startdate, enddate} = await req.json()
    const startDate = new Date(startdate)
    const endDate = new Date(enddate)

    console.log(startDate)
    console.log(endDate)
    
    let report = []
     
     try{
        connectdb()
        // step one fetch all supervisors
        const supervisors = await User.find({role:"supervisor"})
        // get suppervisor totals
        for(const supervisorindex in supervisors){
            const supervisor = supervisors[supervisorindex]
            const transactions = await Airtimetransaction.find({
                issuccessful: true, 
                cleared:true, 
                clearedby: supervisor._id,
                updatedAt: { $gte: startDate, $lt: endDate }})

            var zigtotal = 0
            var usdtotal = 0

            transactions.forEach(transaction => {
                if(transaction.extras.currency === "USD"){
                    usdtotal = usdtotal + transaction.extras.amount
                }else if(transaction.extras.currency === "ZIG"){
                    zigtotal = zigtotal + transaction.extras.amount
                }
            });

            report.push({
                supervisorid: supervisor._id,
                supervisorname: `${supervisor.surname} ${supervisor.firstname}`,
                usdcollected: usdtotal,
                zigcollected: zigtotal
            })
        }
        return NextResponse.json({ 
            success: true,
            message:"Transactions fetched successfully",
            report
        })

     }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while fetching transactions"
        })
     }
}