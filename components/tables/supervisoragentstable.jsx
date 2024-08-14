// components/AgentsTable.js
"use client";
import { useEffect, useState } from "react";
const PAGE_SIZE = 10;

export default function SupervisorAgentsTable({supervisor}) {

  
  const [users, setUsers] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isfetching, setIsfetching] = useState(false)



  const getAgents= async (page = 1) => {
    setIsfetching(true)
    console.log(isfetching)
    const res = await fetch("/api/supervisors/supervisoragents", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        supervisor,
        page,
        pageSize: PAGE_SIZE,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
      setTotal(data.total);
      // Fetch sales data for each user
      data.users.forEach(user => {
        getTotalSalesForUser(user._id);
      });
      setIsfetching(false)
    } else {
      setIsfetching(false)
    }
  };

  const getTotalSalesForUser = async (userid) => {
    const res = await fetch(`/api/airtimetransactions/totals/${userid}`, {
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
          notcahsedin: data.notcahsedin
        },
      }));
    } else {
      setError(`Error fetching sales data for user ${userid}`);
    }
  };



  useEffect(() => {
    getAgents(page);
  }, [page]);

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

  return (
    <div className="flex w-full h-full">
      {isfetching? ( 
        <div className="w-full flex items-center justify-center p-8"> 
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ):( 
        <div className="min-w-full max-h-full overflow-hidden text-sm">
          <table className="w-full">
            <tbody>
              <tr className="bg-gray-200 font-semibold">
                <td className="border border-white px-1">#</td>
                <td className="border border-white px-1">Agent name</td>
                <td className="border border-white px-1">Phone Numb</td>
                <td className="border border-white px-1">Location</td>
                <td className="border border-white px-1">Machine Number</td>
                <td className="border border-white px-1">Cash in Hand</td>
                <td className="border border-white px-1">Collected</td>
                <td className="border border-white px-1">Monthly Sales</td>
              </tr>
              {users.map((user, i) => (
                <tr className="" key={i}>
                  <td className="border-b border px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="border-b border px-1">{`${user.firstname} ${user.surname}`}</td>
                  <td className="border-b border px-1">{user.phonenumber}</td>
                  <td className="border-b border px-1">{user.location}</td>
                  <td className="border-b border px-1"></td>
                  <td className="border-b border px-1">
                    {salesData[user._id] ? salesData[user._id].pending : "Loading..."}
                  </td>
                  <td className="border-b border px-1">
                    {salesData[user._id] ? salesData[user._id].notcahsedin : "Loading..."}
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
      )}
    </div>
  )
}
