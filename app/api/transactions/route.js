// pages/api/transactions.js
import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Transaction from "@/app/models/transaction";
import User from "@/app/models/user";
import bcrypt from "bcrypt";

// Get all transactions
export async function GET(req) {
  try {
    await connectdb();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

    const totalTransactions = await Transaction.countDocuments();
    const transactions = await Transaction.find()
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!transactions) {
      return NextResponse.json({
        message: "Failed to fetch transactions",
        success: false,
      });
    }

    return NextResponse.json({
      transactions,
      total: totalTransactions,
      page,
      pageSize,
      message: "Transactions fetched successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error,
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
      });
    }

    const result = await Transaction.updateMany(
      { userid: userid },
      { cleared: true, clearedby: user._id }
    );

    if (!result) {
      return NextResponse.json({
        message: "Failed to clear transactions",
        success: false,
      });
    }
    return NextResponse.json({
      message: "Transactions cleared successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error while clearing transactions",
      success: false,
    });
  }
}
