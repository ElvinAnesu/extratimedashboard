import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import ZesaTransaction from "@/app/models/zesatransaction"

export async function GET(req,{params}){
    const {userid} = params
    console.log("userid",userid)
    try{
        await connectdb()
        const zesatransactions = await ZesaTransaction.find({userid:userid, cleared:false}).sort({ _id: -1 }) 
        if(!zesatransactions){
            return NextResponse.json({
                message:"failed to fetch transactions",
                success: false
            })
        }
        return NextResponse.json({
            zesatransactions,
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
            await ZesaTransaction.create({
                transaction : "USD zesa",
                username: username,
                userid:userid,
                currency: currency,
                amount: amount,
                issuccessful: true,
                extras :extras})

        return  NextResponse.json({
            message: "Zesa Transaction logged successfully",
            success: true
        })
    }catch(error){
        return NextResponse.json({
            message: "Failed to log Zesa transaction!",
            success: false
        })
    }
}