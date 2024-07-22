import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"

export async function GET(req, { params }) {
    const { clearedby } = params
    try {
        await connectdb()
        const transactions = await Transaction.find({ clearedby })

        if (!transactions) {
            return NextResponse.json({
                success: false,
                message: "Failed to fetch transactions"
            })
        }

        // Calculate the total amount in extras for transactions cleared by the user
        const totalAmount = transactions.reduce((sum, transaction) => {
            if (transaction.extras && transaction.extras.amount) {
                return sum + transaction.extras.amount
            }
            return sum
        }, 0)

        return NextResponse.json({
            success: true,
            message: "Transactions fetched successfully",
            transactions,
            totalAmount
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error,
            message: "Error while fetching transactions"
        })
    }
}
