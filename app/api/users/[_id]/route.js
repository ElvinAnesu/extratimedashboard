import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import User from "@/app/models/user"

// delete one user
export async function DELETE(req, {params}){
    const {_id} = params
    try{
        connectdb()
        const result =  await User.findByIdAndDelete({_id:_id})
       if(result){
            return NextResponse.json({
                message:"User successfully deleted",
                success: true
            })
       }else{
        return NextResponse.json({
            message:"User not deleted",
            success: failed
        })
       }

    }catch(error){
        return NextResponse.json({
            error,
            message: "Error",
            success: false
        })
    }
}

// fetch one user by id
export async function GET(req, {params}){
    const {_id} = params
    
    try{
        connectdb()
        const user = await User.findById({_id: _id})
        if(!user){
            return NextResponse.json({
                message:"User not found!",
                success: false
            })
        }
        return NextResponse.json({
            user,
            message:"User fetched successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            error,
            message:"Error in fetching user",
            success: false
        })
    }
}

//fetch users buy role
export async function POST(req){
    const {role} = await req.json()
    
    try{
        connectdb()
        const users = await User.find({role: role})
        if(!users){
            return NextResponse.json({
                message:"Users not found!",
                success: false
            })
        }
        return NextResponse.json({
            users,
            message:"Users fetched successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            error,
            message:"Error in fetching users",
            success: false
        })
    }
}

//update users
export async function PUT(req,{params}){
    const {_id} = params
    const { email, 
            surname, 
            firstname, 
            phonenumber, 
            location, 
            supervisor,
            role} = await req.json()
    
    try{
        connectdb()
        const result = await User.findByIdAndUpdate({_id:_id},{
            email, 
            surname, 
            firstname, 
            phonenumber, 
            location, 
            supervisor,
            role
        })
        if(!result){
            return NextResponse.json({
                message : "failed to update user",
                success:false
            })
        }
        return NextResponse.json({
            message : "user updated successfylly",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            error,
            message:"Error updating user",
            success: false
        })
    }
}