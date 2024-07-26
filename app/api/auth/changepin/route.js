import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"
import bcrypt from "bcrypt"

//change password

export async function PUT(req){
    const {phonenumber, newpin} = await req.json()
    try{
        connectdb()
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpin, saltRounds)
        const user = await User.findOneAndUpdate({phonenumber},{password:hashedPassword})
        if(!user){
            return NextResponse.json({
                success:false,
                message:"failed to change password"
            })
        }
        return NextResponse.json({
            success:true,
            message:"password updated successfully"
        })
    }catch(error){
        return NextResponse.json({
            error,
            message: "failed to change password",
            success: false
        })
    }
}