import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"


export async function POST(req) {
    const {_id} = await req.json()
    console.log(_id)
    try{
        connectdb()
        const transactions = await Airtimetransaction.find({clearedby:_id, issuccessful: true, cleared:true})
        if(!transactions){
            return NextResponse.json({ 
                success: false,
                message:"No transaction found",
            })
        }

        let totalcollections = 0

        transactions.forEach((transactioin) => { 
            totalcollections = totalcollections + transactioin.extras.amount
        })

        return NextResponse.json({ 
            success:true,
            message:"Transactions fetched successfully",
            totalcollections,
            transactions
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while fetching totals"
        })
    }
}