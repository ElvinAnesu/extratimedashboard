import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"

export async function GET(req,{params}){
    const {userid} = params
    try{
        connectdb()
        const transactions = await Transaction.find({userid:userid})
        if(!transactions){
            return NextResponse.json({
                success:false,
                message: "Transactions not found"
            })
        }
        let _clearedsales = 0;
        let _pendingsales = 0;
        transactions.forEach((transaction) => {
            if (transaction.cleared) {
            _clearedsales += transaction.extras.amount;
            } else {
            _pendingsales += transaction.extras.amount;
            }
        });
        return NextResponse.json({
            success: true,
            clearedsales: _clearedsales,
            pendingsales: _pendingsales,
            message:"totals fetched successfully"
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error.toString()
        })
    }
}