import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import Location from "@/app/models/location";

export async function POST(req){
    const {location} = await req.json()
    try{
        connectdb()
        await Location.create({location:location})

        return NextResponse.json({
            message : "Location added successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json(error)
    }
}

export async function GET(req){
    try{
        connectdb()
        const locations = await Location.find()

        if(!locations){
            return NextResponse.json({
                message: "Failed to fetch locations",
                success: false
            })
        }

        return NextResponse.json({
            locations,
            message: "locations fetched successfully",
            success: true
        })

    }catch(error){
        return NextResponse.json(error)
    }
}