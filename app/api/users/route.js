import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"
import bcrypt from "bcrypt"

//create new user
export async function POST(req){
    const { email, 
            password, 
            surname, 
            firstname, 
            phonenumber, 
            location, 
            supervisor,
            role, 
            assignedVouchers} = await req.json()

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    console.log(hashedPassword)

    try {
        connectdb()
        await User.create({
            email, 
            password : hashedPassword, 
            surname, 
            firstname, 
            phonenumber, 
            location, 
            supervisor, 
            role, 
            assignedVouchers
        })
        return NextResponse.json({
            message: "User created successfully",
            success: true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
}

//get all users
export async function GET(){
    try{
        connectdb()
        const users = await User.find()
        if(!users){
            return NextResponse.json({
                message:"Failed to fetch Users",
                success: false
            })
        }
        return NextResponse.json({
            users,
            message:"Users fetched successfully",
            success: true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
}