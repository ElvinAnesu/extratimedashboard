import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"


export const dynamic = 'force-dynamic'

export async function GET(request) {
    try{
        connectdb()
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const transactions = await Airtimetransaction.find({issuccessful:true, createdAt:{
            $gte: startOfDay,
            $lte: endOfDay,
          },})

        if(!transactions){
            return NextResponse.json({
                success: false,
                message: "failed to fetch transactions"
            })
        }

        let totalsales = 0

        transactions.forEach(transaction => {
            totalsales = totalsales + transaction.extras.amount
        })

        return NextResponse.json({
            success:true,
            todayssales: totalsales
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error while fetching transaction"
        })
    }
}