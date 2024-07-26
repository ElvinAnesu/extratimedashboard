// pages/api/users/filters.js
import { NextResponse } from "next/server";
import connectdb from "@/mongodb";
import User from "@/app/models/user";

// Fetch users by role with pagination
export async function POST(req) {
  const { role, page = 1, pageSize = 10 } = await req.json();

  try {
    await connectdb();
    const totalUsers = await User.countDocuments({ role });
    const users = await User.find({ role })
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

export async function GET(req, { params }) {
  const { _id } = params;
  try {
    await connectdb();
    const user = await User.findOne({ _id });
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
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Error in fetching user",
      success: false,
    });
  }
}

export async function PUT(req, { params }) {
  const { _id } = params;
  const { surname, firstname, phonenumber, email, role, supervisor, location } = await req.json();

  try {
    await connectdb();
    const updatedUser = await User.findOneAndUpdate({ _id }, { surname, firstname, phonenumber, email, role, supervisor, location });

    if (!updatedUser) {
      return NextResponse.json({
        message: "User not found or update failed!",
        success: false,
      });
    }

    return NextResponse.json({
      user: updatedUser,
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Error in updating user",
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  const { _id } = params;

  try {
    await connectdb();
    const deletedUser = await User.findOneAndDelete({ _id });

    if (!deletedUser) {
      return NextResponse.json({
        message: "User not found or delete failed!",
        success: false,
      });
    }

    return NextResponse.json({
      user: deletedUser,
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      message: "Error in deleting user",
      success: false,
    });
  }
}