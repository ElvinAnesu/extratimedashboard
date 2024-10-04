import { NextResponse } from "next/server";
import NetoneTransaction from "@/app/models/netonetrsansaction";
import connectdb from "@/mongodb";

export async function POST(request, { params }) {
	const { productCode, targetMobile, executedBy, executerId } =
		await request.json();

	const amount = getAmount(productCode);
	const refrenceCode = Date.now().toString();
	const transactionId = await logTransaction(
		executedBy,
		executerId,
		"USD",
		amount,
		targetMobile
	);
	if (transactionId) {
		try {
			const response = await fetch(
				"https://pinlessevd.netone.co.zw/api/v1/agents/recharge-data-usd",
				{
					method: "POST",
					headers: {
						"x-access-code": "platinumresources1@gmail.com",
						"x-access-password": "Default001",
						"x-agent-reference": refrenceCode,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						productCode,
						targetMobile,
					}),
				}
			);

			const data = await response.json();

			if (data.ReplyCode === 2) {
				updateTransactionStatus(transactionId);
				return NextResponse.json({
					success: true,
					balance: data.Amount,
					message: data.ReplyMsg,
				});
			} else {
				return NextResponse.json({
					success: false,
					message: data.ReplyMessage,
				});
			}
		} catch (error) {
			console.log("Error: ", error.message);
			return NextResponse.json({
				success: false,
				message: "Error while fetching balance",
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
function getAmount(productCode) {
	let amount = 0;
	switch (productCode) {
		case "UA05":
			amount = 0.5;
			break;
		case "UA1":
			amount = 1;
			break;
		case "UA02":
			amount = 2;
			break;
		case "UA5":
			amount = 5;
			break;
		case "UA10":
			amount = 10;
			break;
		case "UA20":
			amount = 20;
			break;
		case "UA50":
			amount = 50;
			break;
	}
	return amount;
}
