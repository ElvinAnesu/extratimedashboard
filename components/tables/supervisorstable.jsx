"use client";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function SupervisorsTable() {

  const router = useRouter()

  const [showdialog, setShowdialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [agnetsData, setAgentsData] = useState({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  

  const getUsers = async (page = 1) => {
    const res = await fetch("/api/users/filters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        role: "supervisor",
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
        getSupervisorsAgents(user._id)
      });
    } else {
      setError("Error fetching users");
    }
  };

  const getSupervisorsAgents = async (userid) => {
    const res = await fetch("/api/users/filters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        filter: "supervisor",
        value: userid,
        pageSize: PAGE_SIZE,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setAgentsData(prevAgentsData => ({
        ...prevAgentsData,
        [userid]: {
          agents: data.users,
        },
      }));
    } else {
      setError(`Error fetching sales data for user ${userid}`);
    }
  }

  const viewSupervisor = (_id) => {
    router.push(`/dashboard/supervisors/${_id}`)
  }
  

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
    <div className="min-w-full max-h-full overflow-hidden text-sm">
      <table className="w-full">
        <tbody>
          <tr className="bg-gray-200 font-semibold">
            <td className="border border-white px-1">#</td>
            <td className="border border-white px-1">Agent name</td>
            <td className="border border-white px-1">Phone Number</td>
            <td className="border border-white px-1">Email</td>
            <td className="border border-white px-1">Action</td>
          </tr>
          {users.map((user, i) => (
            <tr className="" key={i}>
              <td className="border-b border px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="border-b border px-1">{`${user.firstname} ${user.surname}`}</td>
              <td className="border-b border px-1">{user.phonenumber}</td>
              <td className="border-b border px-1">{user.email}</td>
              <td className="border-b border px-1">
                <button className="bg-blue-600 p-1 rounded flex items-center justify-center text-white"
                onClick={() => viewSupervisor(user._id)}>
                  <EyeOpenIcon />
                </button>
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
    </div>
  );
}
