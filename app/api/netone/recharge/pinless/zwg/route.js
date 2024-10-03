import { NextResponse } from "next/server";

export async function POST(request, { params }) {
	const { amount, targetMobile } = await request.json();
	const refrenceCode = Date.now().toString();

	try {
		const response = await fetch(
			"https://pinlessevd.netone.co.zw/api/v1/agents/recharge-pinless",
			{
				method: "POST",
				headers: {
					"x-access-code": "platinumresources1@gmail.com",
					"x-access-password": "Default001",
					"x-agent-reference": refrenceCode,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount,
					targetMobile,
				}),
			}
		);

		const data = await response.json();

		if (data.ReplyCode === 2) {
			return NextResponse.json({
				success: true,
				message: data.ReplyMsg,
				amount: data.Amount,
			});
		} else {
			console.log(data);
			return NextResponse.json({
				success: false,
				message: data.ReplyMsg,
			});
		}
	} catch (error) {
		console.log("Error: ", error.message);
		return NextResponse.json({
			success: true,
			message: "Error while recharging airtme",
		});
	}
}
