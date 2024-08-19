import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import User from "@/app/models/user"
import Airtimetransaction from "@/app/models/airtimetransaction"
import bcrypt from "bcrypt"

//get user transactions
export async function GET(req,{params}){
    const {userid} = params
    try{
        const transactions = await Airtimetransaction.find({executerid:userid})
        if(!transactions){
            return NextResponse.json({
                success:false,
                message:"failed to fetch transactions",
            })
        }
        return NextResponse.json({
            success:true,
            message:"transactions fetched successfully",
            transactions,
        })
    }catch(error){
        return NextResponse.json({
            success:false,
            message:"Error fetching transactions",
            error
        })
    }
}
// Clear transactions
export async function POST(req,{params}) {
    const {userid} = params
    const { supervisoremail, supervisorpassword } = await req.json()
  
    try {
      await connectdb();
      const user = await User.findOne({ email: supervisoremail })
      if (!user) {
        return NextResponse.json({
          message: "User not found",
          success: false,
        });
      }
      const isMatch = await bcrypt.compare(supervisorpassword, user.password)
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
  
      const today = new Date()

      const result = await Airtimetransaction.updateMany(
        { executerid: userid, cleared: false },
        { cleared: true, clearedby: user._id, clearedat:today}
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
  