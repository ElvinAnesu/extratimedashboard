// components/UsersTable.js
"use client";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import AlertDialog from "../dialogs/alertdialog";
import { MagnifyingGlassIcon, PlusIcon} from "@radix-ui/react-icons"

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
  const [searchQuery, setSearchquery] = useState()


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
    const res = await fetch(`/api/users?page=${page}&pageSize=${PAGE_SIZE}&searchQuery=${searchQuery}`, {
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
    <div className="min-w-full max-h-full flex flex-col gap-2 overflow-hidden text-sm bg-gray-200 rounded p-4">
      <div className="flex items-center justify-between">
        <div className=" mb-2 flex gap-2  flex items-center justify-betweeen">
            <input className="border rounded border-gray-400  py-1 px-2 text-sm text-black"
                placeholder="search by firstname"
                type="text"
                onChange={(e) => setSearchquery(e.target.value)}
                />   
            <button className="px-2 rounded bg-blue-600 text-white flex gap-1  py-1 px-2 text-sm flex items-center justify-center"
                onClick={getUsers}>
                <MagnifyingGlassIcon />
                Search
            </button>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-900 rounded px-2 py-1 text-white"
            onClick={()=>router.push("/dashboard/users/createnew")}>
            <PlusIcon />Add New
        </button>
      </div>
      <table className="w-full">
        <tbody>
          <tr className="bg-blue-900 text-white font-semibold">
            <td className="px-1">#</td>
            <td className="px-1">Surname</td>
            <td className="px-1">First Name</td>
            <td className="px-1">Role</td>
            <td className="px-1">Email</td>
            <td className="px-1">Phone Number</td>
            <td className="px-1">Action</td>
          </tr>
          {users.map((user, i) => (
            <tr className="border boder-b border-b-gray-300" key={i}>
              <td className="px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="px-1">{user.surname}</td>
              <td className="px-1">{user.firstname}</td>
              <td className="px-1">{user.role}</td>
              <td className="px-1">{user.email}</td>
              <td className="px-1">{user.phonenumber}</td>
              <td className="px-1">
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
                    <TrashIcon />
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
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={page * PAGE_SIZE >= total}
          className="px-4 py-2 bg-blue-900 text-white rounded"
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
