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
//log transaction
export async function POST(req,{params}){
    const {userid} = params;
    const {username, currency, amount, extras} = await req.json()
    try{
        await connectdb()
            await Transaction.create({
                transaction : "USD Pinless airtime",
                username: username,
                userid:userid,
                currency: currency,
                amount: amount,
                issuccessful: true,
                extras :extras})

        return  NextResponse.json({
            message: "Transaction logged successfully",
            success: true
        })
    }catch(error){
        return NextResponse.json({
            message: "Failed to log transaction!",
            success: false
        })
    }
}