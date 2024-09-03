import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(params) {
    try{
        await connectdb()
        const transactions = await Airtimetransaction.aggregate([
            {
                $match: {
                    issuccessful: true,
                    cleared: false
                }
            },
            {
                $project: {
                    executedby: 1,
                    executerid: 1,
                    currency: 1,
                    amount: 1,
                    issuccessful: 1,
                    cleared: 1,
                    clearedby: 1,
                    clearedat: 1,
                    cashedin: 1,
                    extras: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    totalAmount: {
                        $add: [
                            { $ifNull: [{ $toDouble: "$extras.amount" }, 0] }  // Convert extras.amount to a number, default to 0 if null
                        ]
                    }
                }
            },
        ])

        const total = transactions.reduce((acc, doc) => acc + doc.totalAmount, 0)

        return NextResponse.json({ 
            success: true,
            message: "Totals and transactions fetched successfully",
            total,
            transactions
        });
    }catch(error){
        console.log(error)
        return NextResponse.json({ 
            success:false,
            message:"Error while fetching totals"
        })
    }
    
}
