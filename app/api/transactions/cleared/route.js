import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Transaction from "@/app/models/transaction"

export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        await connectdb()
        const pendingTransactions = await Transaction.find({ cleared: true })

        if (!pendingTransactions) {
            return NextResponse.json({ 
                success: false,
                message: "Failed to fetch transactions",
            })
        }

        // Calculate the total amount in extras
        const totalAmount = pendingTransactions.reduce((sum, transaction) => {
            if (transaction.extras && transaction.extras.amount) {
                return sum + transaction.extras.amount
            }
            return sum
        }, 0)

        return NextResponse.json({ 
            success: true,
            transactions: pendingTransactions,
            totalAmount,
            message: "Transactions fetched successfully"
        })
    } catch (error) {
        return NextResponse.json({
            error,
            message: "Error while fetching transactions",
            success: false
        })
    }
}
