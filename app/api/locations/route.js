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

//get all locations with pagination
export async function GET(req){
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page")) || 1
    const pageSize = parseInt(searchParams.get("pageSize")) || 10
    const searchQuery = searchParams.get("searchQuery")

    console.log(searchQuery)

    const query = searchQuery != "null" && searchQuery != null
      ? { surname: { $regex: new RegExp(searchQuery, 'i') } }
      : {}

    console.log(query) 
    try{
        await connectdb()
        const totalLocations = await Location.countDocuments(query)
        
        const locations = await Location.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize)

        if(!locations){
            return NextResponse.json({
                message: "Failed to fetch locations",
                success: false
            })
        }

        return NextResponse.json({
            locations,
            total:totalLocations,
            page,
            pageSize,
            message: "locations fetched successfully",
            success: true
        });

    }catch(error){
        console.log(error);
        return NextResponse.json({
            error,
            message: "Error in fetching Locations",
            success: false,
        });    
    }
}