import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"
import bcrypt from "bcrypt"
import { act } from "react"


export async function PUT(request) {
    const {newamount, phonenumber, action, pin, _id} =  await request.json()

    console.log(newamount, phonenumber, action, pin, _id)
    try{
        await connectdb()
        const user = await User.findOne({phonenumber})
        if(!user){
            return NextResponse.json({
                success:false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(pin, user.password)

        if(isMatch){
            if(action === "increase"){
                if(user.role === "agent"){
                    const updateshortfall = User.findOneAndUpdate({_id},{shortfall:newamount})
                    if(!updateshortfall){
                        return NextResponse.json({
                            success:false,
                            message: "Shortfall not updated"
                        })
                    }
                    return NextResponse.json({
                        updateshortfall,
                        success:true,
                        message: "Shortfall updated successully"
                    })
                }else{
                    return NextResponse.json({
                        success:false,
                        message: "No rights to perfom this action"
                    })
                }
            }else if(action === "decrease"){
                if(user.role !== "agent"){
                    const updateshortfall = User.findOneAndUpdate({_id},{shortfall:newamount})
                    if(!updateshortfall){
                        return NextResponse.json({
                            success:false,
                            message: "Shortfall not updated"
                        })
                    }
                    return NextResponse.json({
                        success:true,
                        message: "Shortfall updated successully"
                    })
                }else{
                    return NextResponse.json({
                        success:false,
                        message: "No rights to perfom this action"
                    })
                }
            }else{
                return NextResponse.json({
                    success:false,
                    message: "Invalid Action"
                })  
            }
        }else{
            return NextResponse.json({
                success:false,
                message: "Wrong password"
            })
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error while updating shortfall"
        })
    }
}