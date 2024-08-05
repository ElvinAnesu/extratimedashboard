import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"


export async function POST(req) {
    const {supervisor} = await req.json()
    try{
        
        connectdb()
        const agents = await User.find({supervisor: { $regex: supervisor, $options: 'i' }})

        if(!agents){
            return NextResponse.json({
                success: false,
                message:"Agents not found"
            })  
        }
        return NextResponse.json({
            success: true,
            message:"Agents fetched successfully",
            agents
        }) 
    }catch(error){
        return NextResponse.json({
            error,
            success: false,
            message:"Error while fetching users"
        })
    }
}