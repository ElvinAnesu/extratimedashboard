import { NextResponse } from "next/server";
import connectdb from "@/mongodb";
import NetoneTransaction from "@/app/models/netonetrsansaction";

export async function POST(request, { params }) {
	const { amount, targetMobile, executedBy, executerId } = await request.json();
	const refrenceCode = Date.now().toString();
	const transactionId = await logTransaction(
		executedBy,
		executerId,
		"ZWG",
		amount,
		targetMobile
	);
	if (transactionId) {
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
				updateTransactionStatus(transactionId);
				return NextResponse.json({
					success: true,
					message: data.ReplyMsg,
					amount: data.Amount,
				});
			} else {
				console.log(data);
				return NextResponse.json({
					success: false,
					message: data.ReplyMessage,
				});
			}
		} catch (error) {
			console.log("Error: ", error.message);
			return NextResponse.json({
				success: true,
				message: "Error while recharging airtme",
			});
		}
	} else {
		return NextResponse.json({
			success: false,
			message: "Failed to log transaction",
		});
	}
}

async function logTransaction(
	executedBy,
	executerId,
	currency,
	amount,
	receiver
) {
	try {
		await connectdb();
		const newtransaction = await NetoneTransaction.create({
			executedBy,
			executerId,
			currency,
			amount,
			receiver,
		});
		if (!newtransaction) {
			return null;
		}
		return newtransaction._id;
	} catch (error) {
		console.log("Error: ", error.message);
	}
}
async function updateTransactionStatus(_id) {
	await NetoneTransaction.findByIdAndUpdate(_id, {
		isSuccessful: true,
	});
}