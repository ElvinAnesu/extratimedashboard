import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import Airtimetransaction from "@/app/models/airtimetransaction"
import User from "@/app/models/user"

export const dynamic = 'force-dynamic'

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
            clearedat: {
                $gte: startOfDay,
                $lte: endOfDay,
              },
        })

        const supervisoragents = await User.find({supervisor: { $regex: _id, $options: 'i' }})

        let agentids = []

        supervisoragents.forEach((agent)=> {
            agentids.push(agent._id)
        })

        // get outstanding collections for supervisor
        const agentstransactions = await Airtimetransaction.find({ executerid: { $in: agentids } , cleared: false, issuccessful: true})
        let pendingtotal = 0
        agentstransactions.forEach((transaction) => {
            pendingtotal = pendingtotal + transaction.extras.amount
        })
        //get daily perfomances of supervisors agents
        const agentstransactionstoday = await Airtimetransaction.find({ 
            executerid: { $in: agentids } , 
            issuccessful: true,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },})
        let salestotal = 0
        agentstransactionstoday.forEach((transaction) => {
            salestotal = salestotal + transaction.extras.amount
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
            todayscollections,
            totalcollections,
            pendingtotal,
            salestotal,
            agentstransactions,
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