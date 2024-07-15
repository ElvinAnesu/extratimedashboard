import connectdb from "@/mongodb"
import { NextResponse } from "next/server"
import AirtimeVoucher from "@/app/models/airtimevoucher"
import Transaction from "@/app/models/transaction"


//create new voucher
export async function POST(req){
    const {
            serialno,
            batchno,
            rechargepin,
            amount,
            currency,
            } = await req.json()

    console.log("this",serialno,
        batchno,
        rechargepin,
        amount,
        currency,)

    try{
        connectdb()
        const result = await AirtimeVoucher.create({
            serialno,
            batchno,
            rechargepin,
            amount,
            currency,
        })
        if(!result){
            return NextResponse.json({
                message: "failed to upload voucher",
                success: false
            })
        }
        return NextResponse.json({
            message: "Voucher uploaded successfully",
            success: true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            error: error,
            message: "Exception while creating voucher",
            success: false
        })
    }
}

//get all vouchers
export async function GET(){
    try{
        connectdb()
        const vouchers = await AirtimeVoucher.find()
        if(!vouchers){
            return NextResponse.json({
                message: "failed to fetchvouchers",
                success: false
            })
        }
        return NextResponse.json({
            vouchers,
            message: "vouchers fetch successfully",
            success: true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            error: error,
            message: "Exception while creating voucher",
            success: false
        })
    }
}

//sell the voucher 
export async function PUT(req){
   const {userid, username, currency, amount} = await req.json()

   try{
     await connectdb()
     const voucher = await AirtimeVoucher.findOneAndUpdate(
        {currency:currency, amount:amount,sold: false,},
        {sold: true, allocated:true, allocatedto: userid}
     )
    if(!voucher){
        return NextResponse.json({
            message : "failed to execute the transaction",
            success:false
        })
     }
     await Transaction.create({
        transaction : "airtime-voucher",
        username: username,
        userid:userid,
        currency: currency,
        amount: amount,
        issuccessful: true,
        extras :{
            voucherid: voucher._id
        }
    })

    return NextResponse.json({
        voucher,
        message : "transaction successsful",
        success:true
    })
   }catch(error){
    return NextResponse.json({
        error,
        message:error,
        success: false
    })
   }
}