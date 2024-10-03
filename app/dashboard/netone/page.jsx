"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/cards/dashboardcards";
import { useEffect, useState } from "react";

export default function NetoneHome() {
	const router = useRouter();
	const [usdBalance, setUsdBalance] = useState(0);
	const [fetchingUsdBalance, setFetchingUsdBalance] = useState(false);
	const [zigBalance, setZigBalance] = useState(0);
	const [fetchingZigBalance, setFetchingZigBalance] = useState(false);
	const [zigOutsandingSales, setZigOutsandingSales] = useState(0);
	const [fetchingZigOutsandingSales, setFetchingZigOutsandingSales] =
		useState(false);
	const [usdOutsandingSales, setUsdOutsandingSales] = useState(0);
	const [fetchingUsdOutsandingSales, setFetchingUsdOutsandingSales] =
		useState(false);

	const getUsdBalance = async () => {
		setFetchingUsdBalance(true);
		const referenceCode = Date.now().toString();
		try {
			const response = await fetch(
				"https://pinlessevd.netone.co.zw/api/v1/agents/wallet-balance",
				{
					method: "GET",
					headers: {
						"x-access-code": "platinumresources1@gmail.com",
						"x-access-password": "Default001",
						"x-agent-reference": referenceCode,
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			if (data.ReplyCode === 2) {
				setUsdBalance(data.WalletBalance);
			} else {
				alert("Response", data.ReplyMsg);
			}
		} catch (error) {
			console.error("Error fetching USD balance:", error);
			alert("Exception", error.toString());
		} finally {
			setFetchingUsdBalance(false);
		}
	};

	useEffect(() => {
		getUsdBalance();
	}, []);
	return (
		<div className="w-full h-full flex flex-col gap-4 p-4">
			<Header title="Netone" />
			<div className="flex flex-col gap-4">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-end">
					<DashboardCard
						value={
							fetchingZigOutsandingSales
								? "loading..."
								: `USD${zigOutsandingSales.toFixed(2)}`
						}
						product={"Zig outstanding sales"}
					/>
					<DashboardCard
						value={
							fetchingUsdOutsandingSales
								? "loading..."
								: `USD${usdOutsandingSales.toFixed(2)}`
						}
						product={"USD outstanding sales"}
					/>
					<DashboardCard
						value={
							fetchingZigBalance ? "loading..." : `USD${zigBalance.toFixed(2)}`
						}
						product={"Zig balance"}
					/>
					<DashboardCard
						value={
							fetchingUsdBalance ? "loading..." : `USD${usdBalance.toFixed(2)}`
						}
						product={"USD balance"}
					/>
				</div>
			</div>
		</div>
	);
}
