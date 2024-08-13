import { NextResponse } from "next/server";
import connectdb from "@/mongodb";
import User from "@/app/models/user";


export async function POST(req) {
  const { supervisor, page = 1, pageSize = 10 } = await req.json();
    console.log(supervisor)
  try {
    await connectdb();
    const totalUsers = await User.countDocuments( {supervisor: { $regex: supervisor, $options: 'i' }});
    const users = await User.find({supervisor: { $regex: supervisor, $options: 'i' }})
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!users) {
      return NextResponse.json({
        message: "Agents not found!",
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
    console.log(error)
    return NextResponse.json({
      message: "Error in fetching users",
      success: false,
    });
  }
}
