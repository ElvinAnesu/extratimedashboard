import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"
import User from "@/app/models/user"
import bcrypt from "bcrypt"


//get all transactions
export async function GET({params}){

 
    try{
        connectdb()
        const transactions = await Transaction.find().sort({ _id: -1 })
        if(!transactions){
            return NextResponse.json({
                message: "failed to fetch transactions",
                success: false
            })
        }
        return NextResponse.json({
            transactions,
            message: "transactions fetched successfully",
            success: true
        })
    }catch(error){
        return NextResponse.json({
            message: error,
            success: false
        })
    }
}

//clear transactions
export async function POST(req){
    const {supervisoremail, supervisorpassword, userid } = await req.json()

    try{
        await connectdb()
        const user = await User.findOne({email:supervisoremail})
        if(!user){
            return NextResponse.json({
                message:"User not found",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(supervisorpassword, user.password)
        if(!isMatch){
            return NextResponse.json({
                message:"Wrong pasword!",
                success: false
            })
        }
        if(user.role === "agent"){
            return NextResponse.json({
                message:"No rights to perfom this action"
            })
        }
        
        const result = await Transaction.updateMany({userid:userid},{cleared:true, clearedby:user._id})

        if(!result){
            return NextResponse.json({
                message:"Failed to clear transactions",
                success: false
            })
        }
        return NextResponse.json({
            message:"Transactions cleared successfully",
            success:true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:"Error while clearing transactions",
            success: false
        })
    }
}