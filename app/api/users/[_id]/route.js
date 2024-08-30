// pages/api/users/filters.js
import { NextResponse } from "next/server";
import connectdb from "@/mongodb";
import User from "@/app/models/user";

// Fetch users by role with pagination
export async function POST(req) {

  const { searchQuery, role, page = 1, pageSize = 10 } = await req.json();

  const query = searchQuery != "null" && searchQuery != null
  ? {
    $and: [
      {
        $or: [
          { surname: { $regex: new RegExp(searchQuery, 'i') } }, 
          { firstname: { $regex: new RegExp(searchQuery, 'i') } },
          { location: { $regex: new RegExp(searchQuery, 'i') } }
        ]
      },
      { role }
    ]
  }
  : {role}

  console.log(query)

  try {
    await connectdb();
    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!users) {
      return NextResponse.json({
        message: "Users not found!",
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
    return NextResponse.json({
      error,
      message: "Error in fetching users",
      success: false,
    });
  }
}

//get a single user
export async function GET(req,{params}){
  const {_id} = params
  try{
    connectdb()
    const user = await User.findOne({_id})
    if (!user) {
      return NextResponse.json({
        message: "User not found!",
        success: false,
      });
    }

    return NextResponse.json({
      user,
      message: "User fetched successfully",
      success: true,
    });
  }catch(error){
    return NextResponse.json({
      error,
      message: "Error in fetching users",
      success: false,
    });
  }
}

//update user
export async function PUT(req,{params}){
  const {_id} = params
  const { 
    email, 
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
    active
  } = await req.json()
  try{
    connectdb()
    const user = await User.findOneAndUpdate({_id},{
        email,
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
        active
    })
    if(!user){
      return NextResponse.json({
        success:false,
        message:"failed to update user"
      })
    }
    return NextResponse.json({ 
      success:true,
      message:"user updated successfully",
      user,
    })
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      success:false,
      message:"Error updating user",
      error
    })
  }
}
//delete user
export async function DELETE(req,{params}) {
  const {_id} = params
  try{
    connectdb()
    await User.findOneAndDelete({_id:_id});
    return NextResponse.json({ 
      success:true,
      message:"User deleted successfully",
    })
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      success:false,
      message:"Error deleting user",
    })
  }
  
}