import { NextResponse } from "next/server"
import connectdb from "@/mongodb"
import Airtimetransaction from "@/app/models/airtimetransaction"


export async function PUT(req){
    try{
        connectdb()
        const transaction = await Airtimetransaction.updateMany(
            { clearedby: "6697d1e425e820c65660a6fa"},
            { cashedin: true }
        )
        if(!transaction){
            return NextResponse.json({
                success:false,
                message:"failed to modify transactions",
            })
        }
        return NextResponse.json({
            success:true,
            message:"transactions modified successfully",
            transaction
        })

    }catch(error){
        return NextResponse.json({ 
            success:false,
            error,
            message:"Error while modifying transactions"
        })
    }
}