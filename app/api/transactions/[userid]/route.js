import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"

export async function GET(req,{params}){
    const {userid} = params
    console.log("userid",userid)
    try{
        await connectdb()
        const transactions = await Transaction.find({userid:userid})
        if(!transactions){
            return NextResponse.json({
                message:"failed to fetch transactions",
                success: false
            })
        }
        return NextResponse.json({
            transactions,
            message:"transaction fetched successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            message: "Error fetching transactioins",
            success: false
        })
    }
}