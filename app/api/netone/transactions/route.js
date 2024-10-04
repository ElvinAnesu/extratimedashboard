import connectdb from "@/mongodb";
import { NextResponse } from "next/server";
import NetoneTransaction from "@/app/models/netonetrsansaction";

export async function GET(request) {
	try {
		connectdb();
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page"), 10) || 1;
		const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;

		const transactions = await NetoneTransaction.find()
			.sort({ _id: -1 })
			.skip((page - 1) * pageSize)
			.limit(pageSize);
		if (!transactions) {
			return NextResponse.json({
				success: false,
				message: "transactions not found",
			});
		}
		return NextResponse.json({
			success: true,
			message: "transactionis fetched successfully",
			transactions,
		});
	} catch (error) {
		console.log("Error: ", error.message);
		return NextResponse.json({
			success: false,
			message: error.message,
		});
	}
}
