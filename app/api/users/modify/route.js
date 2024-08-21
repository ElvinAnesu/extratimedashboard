import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"


export async function PUT(request) {
    try{
        connectdb()
        const updateusers = await User.updateMany(
            { address: {$exists: false}},
            { address: null }
        )
        if(!updateusers){
            return NextResponse.json({
                success:false,
                message:"failed to modify users",
            })
        }
        return NextResponse.json({
            success:true,
            message:"users modified successfully",
            updateusers
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({ 
            success: false,
            message: "Error while updating users"
        })
    }
}