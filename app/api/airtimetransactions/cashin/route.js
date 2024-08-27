import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"
import User from "@/app/models/user"
import bcrypt from "bcrypt"

export async function PUT(request) {
    
    const {email, pin, agentid}  = await request.json()
  
    try{
        await connectdb()

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                success:false,
                message: "Admin not found"
            })
        }

        const isMatch = await bcrypt.compare(pin, user.password)
        if(!isMatch){
            return NextResponse.json({
                success:false,
                message: "Wrong Password"
            })
        }

        if(user.role !== "admin"){
            return NextResponse.json({
                success:false,
                message: "No rights to perfom this action"
            }) 
        }

        const transactions = await Airtimetransaction.updateMany(
            { executerid: agentid, cleared: true},
            { cashedin: true }
        )

        if(!transactions){
            return NextResponse.json({
                success:false,
                message: "failed to cash in"
            }) 
        }

        return NextResponse.json({
            success:true,
            message: "transactions cashed in sucessfully"
        })

    }catch(error){
        console.log(error)
        NextResponse.json({ 
            success: false,
            message: "Error while cashing in transactions"
        })
    }
}