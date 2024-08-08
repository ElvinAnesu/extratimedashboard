"use client";
import Header from "@/components/header";
import DashboardCard from "@/components/cards/dashboardcards";
import { useEffect, useState } from "react";

const PAGE_SIZE = 5; // Adjust page size as needed

export default function SupervisorInfo({ params }) {
  const { _id } = params;
  const [oustandingCollections, setOutstandingCollections] = useState(0);
  const [todaysCollections, setTodaysCollections] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [salesData, setSalesData] = useState({});
  const [error, setError] = useState(null);

  // State variables for pagination limits
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(PAGE_SIZE);

  // Fetch agents data with pagination
  const getAgents = async (page = 1) => {
    try {
      const res = await fetch("/api/supervisors/agents", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          supervisor: _id,
          page,
          pageSize: PAGE_SIZE,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.agents);
        setTotal(data.total);
        console.log(data);

        // Fetch sales data for each user
        data.agents.forEach(user => {
          getTotalSalesForUser(user._id);
        });
      } else {
        console.log("Error fetching users");
        setError("Error fetching users");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setError("Error fetching agents");
    }
  };

  // Fetch sales data for a specific user
  const getTotalSalesForUser = async (userid) => {
    try {
      const res = await fetch(`/api/transactions/totals/${userid}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      const data = await res.json();

      if (data.success) {
        setSalesData(prevSalesData => ({
          ...prevSalesData,
          [userid]: {
            pending: data.pendingsales,
            cleared: data.clearedsales + data.pendingsales,
          },
        }));
      } else {
        setError(`Error fetching sales data for user ${userid}`);
      }
    } catch (error) {
      console.error(`Error fetching sales data for user ${userid}:`, error);
      setError(`Error fetching sales data for user ${userid}`);
    }
  };

  useEffect(() => {
    getAgents(page);

    // Update pagination limits based on the current page and PAGE_SIZE
    setLowerLimit((page - 1) * PAGE_SIZE);
    setUpperLimit(Math.min(page * PAGE_SIZE, users.length));
  }, [page, users]);

  // Handle page change
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page * PAGE_SIZE < total) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Header title="Supervisor Analytics" />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full gap-4 justify-end">
          <DashboardCard value={`USD${oustandingCollections.toFixed(2)}`} product={"Outstanding Collections"} />
          <DashboardCard value={`USD${todaysCollections.toFixed(2)}`} product={"Today's Collections"} />
          <DashboardCard value={`USD${totalCollections.toFixed(2)}`} product={"Total Collections"} />
        </div>
        <div className="flex flex-col w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 font-semibold">
                <th className="border border-white px-1">#</th>
                <th className="border border-white px-1">Agent Name</th>
                <th className="border border-white px-1">Phone Number</th>
                <th className="border border-white px-1">Machine Number</th>
                <th className="border border-white px-1">Location</th>
                <th className="border border-white px-1">Cash In Hand</th>
                <th className="border border-white px-1">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(lowerLimit, upperLimit).map((user, i) => (
                <tr key={user._id}>
                  <td className="border-b border px-1">{lowerLimit + i + 1}</td>
                  <td className="border-b border px-1">{`${user.firstname} ${user.surname}`}</td>
                  <td className="border-b border px-1">{user.phonenumber}</td>
                  <td className="border-b border px-1">{""}</td>
                  <td className="border-b border px-1">{user.location}</td>
                  <td className="border-b border px-1">
                    {salesData[user._id] ? salesData[user._id].pending : "Loading..."}
                  </td>
                  <td className="border-b border px-1">
                    {salesData[user._id] ? salesData[user._id].cleared : "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-blue-500 text-white">
              Previous
            </button>
            <span className="text-sm">Page {page}</span>
            <button onClick={handleNextPage} disabled={page * PAGE_SIZE >= total} className="px-4 py-2 bg-blue-500 text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
