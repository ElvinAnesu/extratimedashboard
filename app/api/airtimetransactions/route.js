import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import Airtimetransaction from "@/app/models/airtimetransaction"
import User from "@/app/models/user"
import bcrypt from "bcrypt"


export async function GET(req){
    try{
        await connectdb()
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get("page"), 10) || 1;
        const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

        const totalTransactions = await Airtimetransaction.countDocuments();
        const transactions = await Airtimetransaction.find()
        .sort({ _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

        if (!transactions) {
            return NextResponse.json({
              message: "Fail ed to fetch transactions",
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
    }catch(error){
        return NextResponse.json({ 
            success:false,
            error,
            message:"failed to fetch transactions"
        })
    }
}

export async function POST(req){
    const {executedby, executerid, currency, amount, extras} = await req.json()

    if(executerid === "66ab3cccdab768b02f9238cf" || executerid === "669a3133d9935267edbbb851", executerid === "66ab4fab8650862667e1a8e4" || executerid === "669a2fa563ff511d2da878e2" ){
    return NextResponse.json({
        success:false,
        message:"user account not active"
    })
    }

    try{
       connectdb()
       const transaction = await Airtimetransaction.create({
        executedby,
        executerid,
        currency,
        amount,
        extras
       })
       if(!transaction){
            return NextResponse.json({
                success:false,
                message:"failed to log transaction"
            })
       }
       return NextResponse.json({
            success:true,
            message:"transaction logged successfully",
            transaction
        })
    }catch(error){
        return NextResponse.json({
            success:false,
            error,
            message:"failed to log transaction"
        })
    }
}

export async function PUT(req){
    const {_id, extras} = await req.json()
    try{
        connectdb()
        const transaction = await Airtimetransaction.findOneAndUpdate({_id},{issuccessful:true, extras:extras })
        if(!transaction){
            return NextResponse.json({
                success:false,
                message:"failed to change transaction status",
            })
        }
        return NextResponse.json({
            success:true,
            message:"transaction status changed successfully",
            transaction
        })
    }catch(error){
        return NextResponse.json({ 
            success:false,
            error,
            message:"failed to log transaction"
        })
    }
}