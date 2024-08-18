"use client"
import { useEffect, useState } from "react"
import { Cross1Icon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10

export default function SupervisorAgentsTable({supervisor}) {

  const [users, setUsers] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isfetching, setIsfetching] = useState(false)
  const [showClearmodal, setShowClearmodal] = useState(false)

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

  const confirmCashin = async() => {

  }

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
    <div className="flex w-full h-full bg-gray-200 p-4 rounded">
      {isfetching? ( 
        <div className="w-full flex items-center justify-center p-8"> 
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ):( 
        <div className="min-w-full max-h-full overflow-hidden text-sm">
          <table className="w-full">
            <tbody>
              <tr className="font-semibold bg-blue-900 text-white">
                <td className="px-1">#</td>
                <td className="px-1">Agent name</td>
                <td className="px-1">Phone Number</td>
                <td className="px-1">Location</td>
                <td className="px-1">Cash With Agent</td>
                <td className="px-1">Cash With Supervisor</td>
                <td className="px-1">Agent Monthly Sales</td>
              </tr>
              {users.map((user, i) => (
                <tr className="border-b border-b-gray-300" key={i}>
                  <td className="px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-1">{`${user.firstname} ${user.surname}`}</td>
                  <td className="px-1">{user.phonenumber}</td>
                  <td className="px-1">{user.location}</td>
                  <td className="px-1">
                    {salesData[user._id] ? salesData[user._id].pending : "Loading..."}
                  </td>
                  <td className="px-1">
                    <button className="w-full"
                      onClick={()=> setShowClearmodal(true)}>
                      {salesData[user._id] ? salesData[user._id].notcahsedin : "Loading..."}
                    </button>
                  </td>
                  <td className="px-1">
                    {salesData[user._id] ? salesData[user._id].cleared : "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-blue-900 text-white rounded">
              Previous
            </button>
            <span className="text-sm">Page {page}</span>
            <button onClick={handleNextPage} disabled={page * PAGE_SIZE >= total} className="px-4 py-2 bg-blue-900 text-white rounded">
              Next
            </button>
          </div>
        </div>
      )}

      { showClearmodal && <div className="w-full h-full absolute flex items-center justify-center top-0">
          <div className="flex flex-col bg-white p-8 rounded shadow text-sm items-center">
            <div className="w-full flex items-center justify-end">
              <button className="p-2 rounded border"
                onClick={() => setShowClearmodal(false)}>
                <Cross1Icon />
              </button>
            </div>
            <h1 className="font-semibold">Confirm Cash In</h1>
            <p className="text-xs">confirm amount to be cleared matches the amount submited by the supervisor</p>
            <div className="flex flex-col gap-2 m-2">
              <input className="border rounded border border-gray-900 px-2" 
                placeholder="email"/>
              <input className="border rounded border border-gray-900 px-2" 
                placeholder="password"/>
              <button className="bg-blue-900 p-1 rounded text-white"
                onClick={confirmCashin}>
                Confirm
              </button>
            </div>
          </div>
      </div>}
    </div>
  )
}
