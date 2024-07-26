// pages/api/zesatransactions.js
import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import ZesaTransaction from "@/app/models/zesatransaction";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

// Get all Zesa transactions
export async function GET(req) {
  try {
    await connectdb();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

    const totalTransactions = await ZesaTransaction.countDocuments();
    const zesaTransactions = await ZesaTransaction.find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!zesaTransactions) {
      return NextResponse.json({
        message: "Failed to fetch zesa transactions",
        success: false,
      });
    }

    return NextResponse.json({
      zesaTransactions,
      total: totalTransactions,
      page,
      pageSize,
      message: "ZesaTransactions fetched successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}

// Clear transactions
export async function POST(req) {
  const { supervisoremail, supervisorpassword, userid } = await req.json();

  try {
    await connectdb();
    const user = await User.findOne({ email: supervisoremail });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(supervisorpassword, user.password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Wrong password!",
        success: false,
      });
    }
    if (user.role === "agent") {
      return NextResponse.json({
        message: "No rights to perform this action",
        success: false,
      });
    }

    const result = await ZesaTransaction.updateMany(
      { userid: userid },
      { cleared: true, clearedby: user._id }
    );

    if (!result) {
      return NextResponse.json({
        message: "Failed to clear zesa transactions",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Zesa Transactions cleared successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while clearing zesa transactions",
      success: false,
    });
  }
}