import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"
import bcrypt from "bcrypt"

//change password
export async function PUT(req){

    const {_id, oldpin, newpin} = await req.json()
    try{
        connectdb()
        const user = await User.findOne({_id})
        if(!user){
            return NextResponse.json({
                message: "User not found",
                success: false
            }); 
        }
        const isMatch = await bcrypt.compare(oldpin, user.password)
        if(!isMatch){
            return NextResponse.json({
                message: "Wrong old Password",
                success: false
            });  
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpin, saltRounds)
        const updatepin = await User.findOneAndUpdate({_id},{password:hashedPassword})
        if(!updatepin){
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
            message: "failed to change pasword",
            success: false
        })
    }
}