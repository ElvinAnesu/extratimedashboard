"use client";
import Header from "@/components/header";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

export default function PendingTransactions() {
  const [isloading, setIsloading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getTransactions = async (page = 1) => {
    setIsloading(true);
    const res = await fetch(`/api/airtimetransactions/totals`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      setTransactions(data.transactions);
      //setTotal(data.total)
      setIsloading(false);
    } else {
      // setErrormsg(data.message)
      setIsloading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page * PAGE_SIZE < total) {
      setPage(page + 1);
    }
  };

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const now = new Date();

    // Check if createdAt is today
    if (
      dateObj.getDate() === now.getDate() &&
      dateObj.getMonth() === now.getMonth() &&
      dateObj.getFullYear() === now.getFullYear()
    ) {
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      return `today ${hours}:${minutes}`;
    }

    // Check if createdAt is yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      dateObj.getDate() === yesterday.getDate() &&
      dateObj.getMonth() === yesterday.getMonth() &&
      dateObj.getFullYear() === yesterday.getFullYear()
    ) {
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      return `yesterday ${hours}:${minutes}`;
    }

    // For any day before yesterday
    const formattedDate = `${String(dateObj.getDate()).padStart(
      2,
      "0"
    )}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(
      dateObj.getFullYear()
    ).slice(-2)}`;
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${formattedDate} ${hours}:${minutes}`;
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-2">
      <Header title="Agents" />
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
          <h1 className="text-sm text-white font-semibold">Transactions</h1>
          <button
            className="text-sm text-white flex items-center gap-2"
            onClick={() => getTransactions(page)}
          >
            <ReloadIcon />
            Refresh
          </button>
        </div>
        <div className="w-full p-4 rounded bg-gray-200">
          {isloading ? (
            <div className="flex w-full h-full items-center justify-center p-8">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="w-full">
              <tbody>
                <tr className="bg-blue-200 font-semibold text-sm py-1">
                  <td className="px-4">Amount</td>
                  <td className="px-4 hidden md:table-cell">Receiver No.</td>
                  <td className="px-4 hidden md:table-cell">Status</td>
                  <td className="px-4">Executed by</td>
                  <td className="px-4 hidden md:table-cell">Cleared </td>
                  <td className="px-4">Time</td>
                </tr>
                {transactions.map((transaction, i) => (
                  <tr
                    className="bg-gray-200 font-semibold text-xs py-1 border-b border-gray-300"
                    key={i}
                  >
                    <td className="px-4">
                      {transaction.currency}
                      {transaction.amount}
                    </td>
                    <td className="px-4 hidden md:table-cell">
                      {transaction.extras.reciever}
                    </td>
                    <td className="px-4 hidden md:table-cell">
                      {transaction.issuccessful ? "completed" : "failed"}
                    </td>
                    <td className="px-4">{transaction.executedby}</td>
                    <td
                      className={`px-4 ${
                        transaction.cleared
                          ? "text-green-600"
                          : "text-amber-600"
                      } hidden md:block`}
                    >
                      {transaction.cleared ? "Cleared" : "Pending"}
                    </td>
                    <td className="px-4 ">
                      {formatDate(transaction.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-900 rounded text-white"
            >
              Previous
            </button>
            <span className="text-sm">Page {page}</span>
            <button
              onClick={handleNextPage}
              disabled={page * PAGE_SIZE >= total}
              className="px-4 py-2 rounded bg-blue-900 text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
