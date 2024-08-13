import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"


export async function POST(req) {
    const {_id} = await req.json()
    console.log(_id)
    try{
        connectdb()

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const transactions = await Airtimetransaction.find({clearedby:_id, issuccessful: true, cleared:true})
        const todayscollections = await Airtimetransaction.find({   
            clearedby:_id, 
            issuccessful: true, 
            cleared:true,
            updatedAt: {
                $gte: startOfDay,
                $lte: endOfDay,
              },
        })

        if(!transactions){
            return NextResponse.json({ 
                success: false,
                message:"No transaction found",
            })
        }

        
        let totalcollections = 0
        let collectionstoday = 0

        todayscollections.forEach((transactioin) => { 
            collectionstoday = collectionstoday + transactioin.extras.amount
        })

        transactions.forEach((transactioin) => { 
            totalcollections = totalcollections + transactioin.extras.amount
        })

        return NextResponse.json({ 
            success:true,
            message:"Transactions fetched successfully",
            totalcollections,
            collectionstoday,
            transactions
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message:"Error while fetching totals"
        })
    }
}