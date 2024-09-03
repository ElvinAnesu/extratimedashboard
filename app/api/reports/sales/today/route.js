import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"


export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request) {
    try{
        connectdb()
       const transactions = await Airtimetransaction.aggregate([
            {
                // Match documents where createdAt is within today's range and issuccessful is true
                $match: {
                    createdAt: {
                        $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
                        $lt: new Date(new Date().setHours(24, 0, 0, 0))  // Start of tomorrow
                    },
                    issuccessful: true  // Filter for successful transactions
                }
            },
            {
                // Optionally, you can project specific fields if needed
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
                    updatedAt: 1
                }
            },
            {
            // Group by null to sum all extras.amount values
                $group: {
                    _id: null,
                    totalExtrasAmount: { $sum: "$extras.amount" },  // Sum the extras.amount field
                    transactions: { $push: "$$ROOT" }  // Push all the documents to an array
                }
            },
            {
                // Optionally, remove the _id field from the final output
                $project: {
                    _id: 0,
                    totalExtrasAmount: 1,
                    transactions: 1
                }
            }
        ]);

        return NextResponse.json({
            success: true,
            message:"transactions fetched successfully",
            total: transactions[0]?.totalExtrasAmount || 0,  
            transactions: transactions[0]?.transactions || []
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Error while fetching transaction"
        })
    }
}