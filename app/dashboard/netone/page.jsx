"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/cards/dashboardcards";
import { useEffect, useState } from "react";
import NetoneTransactionTable from "@/components/tables/netone/transactions/transactionstable";

export default function NetoneHome() {
	const router = useRouter();
	const [usdBalance, setUsdBalance] = useState(0);
	const [fetchingUsdBalance, setFetchingUsdBalance] = useState(false);
	const [zwgBalance, setZwgBalance] = useState(0);
	const [fetchingZwgBalance, setFetchingZwgBalance] = useState(false);
	const [zwgOutsandingSales, setZwgOutsandingSales] = useState(0);
	const [fetchingZwgOutsandingSales, setFetchingZwgOutsandingSales] =
		useState(false);
	const [usdOutsandingSales, setUsdOutsandingSales] = useState(0);
	const [fetchingUsdOutsandingSales, setFetchingUsdOutsandingSales] =
		useState(false);

	const getUsdBalance = async () => {
		setFetchingUsdBalance(true);
		try {
			const response = await fetch("/api/netone/balance/usd", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (data.success) {
				setUsdBalance(data.balance);
			} else {
				alert("Error: ", data.message);
			}
		} catch (error) {
			console.error("Error fetching USD balance:", error);
			alert("Exception", error.toString());
		} finally {
			setFetchingUsdBalance(false);
		}
	};

	const getZwgBalance = async () => {
		setFetchingZwgBalance(true);
		try {
			const response = await fetch("/api/netone/balance/zwg", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (data.success) {
				setZwgBalance(data.balance);
			} else {
				alert("Error: ", data.message);
			}
		} catch (error) {
			console.error("Error fetching USD balance:", error);
			alert("Exception", error.toString());
		} finally {
			setFetchingZwgBalance(false);
		}
	};

	useEffect(() => {
		getUsdBalance();
		getZwgBalance();
	}, []);
	return (
		<div className="w-full h-full flex flex-col gap-4 p-4">
			<Header title="Netone" />
			<div className="flex flex-col gap-4">
				<div className="flex flex-col md:flex-row gap-4 items-center justify-end">
					<DashboardCard
						value={
							fetchingZwgOutsandingSales
								? "loading..."
								: `USD${zwgOutsandingSales.toFixed(2)}`
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
							fetchingZwgBalance ? "loading..." : `USD${zwgBalance.toFixed(2)}`
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
				<NetoneTransactionTable />
			</div>
		</div>
	);
}
