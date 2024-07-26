import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"

//login agent using phone nnumber
export async function POST(req){
    const {phonenumber, pin} = await req.json()
    try{
        connectdb()
        const user = await User.findOne({phonenumber})
        if(!user){
            return NextResponse.json({
                message: "User not found",
                success: false
            }); 
        }
        const isMatch = await bcrypt.compare(pin, user.password)
        if(!isMatch){
            return NextResponse.json({
                message: "Wrong Password",
                success: false
            });  
        }
        // Generate a JWT token
         const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
         return NextResponse.json({
             user: user,
             message: "Login successful",
             success: true,
             token // send the token back to the client
         });
    }catch(error){
        return NextResponse.json({
            error,
            message: "failed to login user",
            success: false
        })
    }
}