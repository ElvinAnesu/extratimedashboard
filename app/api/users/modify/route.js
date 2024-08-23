import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"


export async function POST(request) {
    try{
        await connectdb()
        const updateusers = await User.updateMany(
            {next: { $exists: false } },
            {$set: {next: "halla" }},
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