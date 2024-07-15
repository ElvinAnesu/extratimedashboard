import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Location from "@/app/models/location";


export async function DELETE(req,{params}){
    const {location} = params
    try{
        connectdb()
        await Location.findOneAndDelete({location:location})
        return NextResponse.json({
            message: "Location Deleted Successfully",
            success: true
        })
    }catch(error){
        return NextResponse.json(error)
    }
}