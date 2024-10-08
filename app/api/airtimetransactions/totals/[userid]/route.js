import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"

export const dynamic = 'force-dynamic'

export async function GET(req,{params}){
    const {userid} = params
    try{
        connectdb()
        const transactions = await Airtimetransaction.find({executerid:userid})
        if(!transactions){
            return NextResponse.json({
                success:false,
                message: "Transactions not found"
            })
        }
        let _clearedsales = 0
        let _pendingsales = 0
        let _notcashedin  = 0

        transactions.forEach((transaction) => {
            if (transaction.cleared && transaction.issuccessful) {
            _clearedsales += transaction.extras.amount
                if(!transaction.cashedin){
                   _notcashedin = _notcashedin +  transaction.extras.amount
                }
            } else if(!transaction.cleared && transaction.issuccessful){
            _pendingsales += transaction.extras.amount
            }
        });
        return NextResponse.json({
            success: true,
            transactions,
            clearedsales: _clearedsales,
            pendingsales: _pendingsales,
            notcahsedin: _notcashedin,
            message:"totals fetched successfully"
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error.toString()
        })
    }
}