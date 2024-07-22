import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"

export async function GET(){
    try{
        connectdb()
        const transactions = await Transaction.find()
        if(!transactions){
            return NextResponse.json({
                success:false,
                message: "Transactions not found"
            })
        }
        
        return NextResponse.json({
            success: true,
            transactions,
            message:"totals fetched successfully"
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error.toString()
        })
    }
}