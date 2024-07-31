import connectdb from "@/mongodb"
import User from "@/app/models/user"
import { NextResponse } from "next/server"
import { user } from "@nextui-org/react";

export async function POST(req){
    const {filter, value} = await req.json()
    let users = null;
    try{
        connectdb()
        if(filter === "supervisor"){
            const regex = new RegExp(value, 'i')
            users = await  User.countDocuments({supervisor: regex})
        }
        if(user === null){
            return NextResponse.json({ 
                success: false,
                message: "Users not found"
            })
        }
        return NextResponse.json({ 
            success: true,
            users,
            message: "Users counted successfully"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({ 
            success: false,
            error,
            message: "Error counting users"
        })
    }
}