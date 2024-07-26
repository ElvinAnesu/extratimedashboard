// components/AgentsTable.js
"use client";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";

const PAGE_SIZE = 10;

export default function AgentsTable() {
  const router = useRouter();

  const [showdialog, setShowdialog] = useState(false);
  const [showDeletedialog, setShowdeletedialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [error, setError] = useState();
  const [deleteuser, setDeleteuser] = useState();
  const [deletedialogtitle, setDeletedialogtitle] = useState();
  const [deletedialogmsg, setDeletedialogmsg] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const viewUser = (_id) => {
    router.push(`/dashboard/users/${_id}`);
  };

  const confirmDelete = (_id) => {
    setDeleteuser(_id);
    setShowdialog(true);
  };

  const deleteUser = async () => {
    const res = await fetch(`/api/users/${deleteuser}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      setDeletedialogtitle("Success");
      setDeletedialogmsg(data.message);
      setShowdeletedialog(true);
    } else {
      setDeletedialogtitle("Failed");
      setDeletedialogmsg(data.message);
      setShowdeletedialog(true);
    }
  };

  const getUsers = async (page = 1) => {
    const res = await fetch("/api/users/filters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        role: "agent",
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
    } else {
      setError("Error fetching users");
    }
  };

  const getTotalSalesForUser = async (userid) => {
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
  };

  const onOk = () => {
    setShowdeletedialog(false);
    window.location.reload();
  };

  useEffect(() => {
    getUsers(page);
  },);

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
    <div className="min-w-full max-h-full overflow-hidden text-sm">
      <table className="w-full">
        <tbody>
          <tr className="bg-gray-200 font-semibold">
            <td className="border border-white px-1">#</td>
            <td className="border border-white px-1">Agent name</td>
            <td className="border border-white px-1">Phone Number</td>
            <td className="border border-white px-1">Location</td>
            <td className="border border-white px-1">Supervisor</td>
            <td className="border border-white px-1">Pending Sales</td>
            <td className="border border-white px-1">Total Sales</td>
          </tr>
          {users.map((user, i) => (
            <tr className="" key={i}>
              <td className="border-b border px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="border-b border px-1">{`${user.firstname} ${user.surname}`}</td>
              <td className="border-b border px-1">{user.phonenumber}</td>
              <td className="border-b border px-1">{user.location}</td>
              <td className="border-b border px-1">{user.supervisor}</td>
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

      {showdialog && (
        <ConfirmDelete
          title="Delete Administrator!"
          message="Are you sure you want to delete this administrator?"
          onCancel={() => setShowdialog(false)}
          onConfirm={deleteUser}
        />
      )}

      {showDeletedialog && <AlertDialog title={deletedialogtitle} message={deletedialogmsg} onOk={onOk} />}
    </div>
  );
}
