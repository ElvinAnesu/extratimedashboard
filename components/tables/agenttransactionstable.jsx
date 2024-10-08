// components/AgentsTable.js
"use client"
import { useEffect, useState } from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10;
 
export default function AgentTransactionsTable() {


  const [users, setUsers] = useState([])
  const [salesData, setSalesData] = useState({})
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isloading, setIsloading] = useState(false)
  const [searchQuery, setSearchquery] = useState()


  const getUsers = async (page = 1) => {
    setIsloading(true)
    const res = await fetch("/api/users/filters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        role: "agent",
        page,
        pageSize: PAGE_SIZE,
        searchQuery
      }),
    });

    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
      setTotal(data.total);
      // Fetch sales data for each user
      data.users.forEach(user => {
        getTotalSalesForUser(user._id)
      });
      setIsloading(false)
    } else{
      setIsloading(false)
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
        },
      }));
    } else {
      setError(`Error fetching sales data for user ${userid}`);
    }
  };


  useEffect(() => {
    getUsers(page);
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
    <div className="min-w-full max-h-full overflow-hidden text-sm p-4 bg-gray-200 rounded shadow flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        <div className="flex gap-4 items-center">
            <h1 className="text-sm text-gray-500">
                Sort by:</h1>
            <select className="rounded px-2 text-sm py-1 border border-gray-400 ">
                <option>Default</option>
                <option>Cash in hand</option>
                <option>Total sales</option>
                <option>Location</option>
            </select>
        </div>
        <div className="flex gap-2">
            <input className=" border rounded border-gray-400  px-2 py-1 text-black text-sm"
                placeholder="search"
                type="text"
                onChange={(e) => setSearchquery(e.target.value)}
                />
            <button className="px-2 rounded bg-blue-600 text-white flex gap-1 text-sm flex items-center justify-center"
              onClick={() => getUsers(page)}>
                <MagnifyingGlassIcon />
                Search
            </button>
        </div>
      </div>
      {isloading? <div className="flex w-full h-full items-center justify-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>:
            <table className="w-full">
            <tbody>
              <tr className="bg-blue-900 font-semibold text-white ">
                <td className="px-1">#</td>
                <td className="px-1">Agent name</td>
                <td className="px-1 hidden md:table-cell">Phone Number</td>
                <td className="px-1 hidden md:table-cell">Location</td>
                <td className="px-1">Supervisor</td>
                <td className="px-1">Pending Sales</td>
                <td className="px-1">Total Sales</td>
                <td className="px-1">Shortfall</td>
              </tr>
              {users.map((user, i) => (
                <tr className="border-b border-gray-300" key={i}>
                  <td className="px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-1">{`${user.firstname} ${user.surname}`}</td>
                  <td className="px-1 hidden md:table-cell">{user.phonenumber}</td>
                  <td className="px-1 hidden md:table-cell">{user.location}</td>
                  <td className="px-1">{user.supervisor? user.supervisor.split('-')[0] : ""}</td>
                  <td className="px-1">
                    {salesData[user._id] ? salesData[user._id].pending.toFixed(2) : "Loading..."}
                  </td>
                  <td className="px-1">
                    {salesData[user._id] ? salesData[user._id].cleared.toFixed(2) : "Loading..."}
                  </td>
                  <td className="px-1">{user.shortfall}</td>
                </tr>
              ))}
            </tbody>
          </table>}
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 rounded py-2 bg-blue-900 text-white">
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button onClick={handleNextPage} disabled={page * PAGE_SIZE >= total} className="px-4 rounded py-2 bg-blue-900 text-white">
          Next
        </button>
      </div>
    </div>
  );
}
