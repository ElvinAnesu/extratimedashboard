import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import Airtimetransaction from "@/app/models/airtimetransaction";

// Create an index on the foreign field
User.collection.createIndex({ active: 1 });
Airtimetransaction.collection.createIndex({ cleared: 1 });

export async function GET(params) {
  try {
    await connectdb();
    const rankings = await User.aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "active",
          foreignField: "cleared",
          as: "userTransactions",
        },
      },
    ]).exec(); // Add .exec() to execute the query

    // Set a timeout (e.g., 10 seconds)
    const timeout = 10000;
    const startTime = Date.now();
    while (!rankings && Date.now() - startTime < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (!rankings) {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch econet airtime rankings",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Econet airtime rankings fetched successfully",
      rankings,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error while fetching econet airtime rankings",
    });
  }
}
