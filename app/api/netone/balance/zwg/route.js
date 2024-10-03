import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const refrenceCode = Date.now().toString();
	try {
		const response = await fetch(
			"https://pinlessevd.netone.co.zw/api/v1/agents/wallet-balance",
			{
				method: "GET",
				headers: {
					"x-access-code": "platinumresources1@gmail.com",
					"x-access-password": "Default001",
					"x-agent-reference": refrenceCode,
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();

		if (data.ReplyCode === 2) {
			return NextResponse.json({
				success: true,
				balance: data.WalletBalance,
				message: data.ReplyMsg,
			});
		} else {
			return NextResponse.json({
				success: false,
				message: data.ReplyMsg,
			});
		}
	} catch (error) {
		console.log("Error: ", error.message);
		return NextResponse.json({
			success: false,
			message: "Error while fetching balance",
		});
	}
}
