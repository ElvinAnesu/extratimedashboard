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
            machinenumber,
            address,
            nextofkin,
            nextofkinphonenumber,
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
            machinenumber,
            address,
            nextofkin,
            nextofkinphonenumber,
            assignedVouchers,
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


// Get all users with pagination
export async function GET(req) {

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page")) || 1
    const pageSize = parseInt(searchParams.get("pageSize")) || 10
    const searchQuery = searchParams.get("searchQuery")

    const query = searchQuery
      ? { firstname: { $regex: new RegExp(searchQuery, 'i') } }
      : {}
  
    try {
      await connectdb();
      const totalUsers = await User.countDocuments(query)
      const users = await User.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
  
      if (!users) {
        return NextResponse.json({
          message: "Failed to fetch Users",
          success: false,
        });
      }
  
      return NextResponse.json({
        users,
        total: totalUsers,
        page,
        pageSize,
        message: "Users fetched successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        error,
        message: "Error in fetching users",
        success: false,
      });
    }
  }