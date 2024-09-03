import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"
import User from "@/app/models/user"
import bcrypt from "bcrypt"

export const dynamic = 'force-dynamic'
//clear cashed in transactions
export async function PUT(request, {params}) {

    const {executerid, supervisorid, email, password} = await request.json()
    try{
        connectdb()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                success: false,
                message:"user email not recognized"
            })
        }
        if(user.role !== "admin"){
            return NextResponse.json({ 
                success: false,
                message:"No rights to perform this action"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return NextResponse.json({
                success:false, 
                message: "Wrong password"
            })
        }
        //clear the transactions
        const cashintransaction = Airtimetransaction.updateMany({clearedby: supervisorid, cashedin:false, executerid:executerid}, {cashedin: true})


    }catch(error){
        return NextResponse.json({ 
            success:false,
            message:"Error while executing operation"
        })
    }


}