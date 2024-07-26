// components/UsersTable.js
"use client";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";

const PAGE_SIZE = 10;

export default function UsersTable() {
  const router = useRouter();

  const [showdialog, setShowdialog] = useState(false);
  const [showDeletedialog, setShowdeletedialog] = useState(false);
  const [users, setUsers] = useState([]);
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

      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== deleteuser));
    } else {
      setDeletedialogtitle("Failed");
      setDeletedialogmsg(data.message);
      setShowdeletedialog(true);
    }
  };

  const getUsers = async (page = 1) => {
    const res = await fetch(`/api/users?page=${page}&pageSize=${PAGE_SIZE}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
      setTotal(data.total);
    } else {
      setError("Error fetching users");
    }
  };

  const onOk = () => {
    setShowdeletedialog(false);
    window.location.reload();
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
    <div className="min-w-full max-h-full overflow-hidden text-sm">
      <table className="w-full">
        <tbody>
          <tr className="bg-gray-200">
            <td className="border border-white px-1">#</td>
            <td className="border border-white px-1">Surname</td>
            <td className="border border-white px-1">First Name</td>
            <td className="border border-white px-1">Role</td>
            <td className="border border-white px-1">Email</td>
            <td className="border border-white px-1">Phone Number</td>
            <td className="border border-white px-1">Action</td>
          </tr>
          {users.map((user, i) => (
            <tr className="" key={i}>
              <td className="border-b border px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="border-b border px-1">{user.surname}</td>
              <td className="border-b border px-1">{user.firstname}</td>
              <td className="border-b border px-1">{user.role}</td>
              <td className="border-b border px-1">{user.email}</td>
              <td className="border-b border px-1">{user.phonenumber}</td>
              <td className="border-b border px-1">
                <div className="flex gap-2 items-center">
                  <button
                    className="bg-blue-600 p-1 rounded flex items-center justify-center text-white"
                    onClick={() => viewUser(user._id)}
                  >
                    <EyeOpenIcon />
                  </button>
                  <button
                    className="bg-red-600 p-1 rounded flex items-center justify-center text-white"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <TrashIcon/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page * PAGE_SIZE >= total}
          className="px-4 py-2 bg-blue-500 text-white"
        >
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

      {showDeletedialog && (
        <AlertDialog title={deletedialogtitle} message={deletedialogmsg} onOk={onOk} />
      )}
    </div>
  );
}