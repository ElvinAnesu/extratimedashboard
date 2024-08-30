"use client";
import { useEffect, useState } from "react";
import ConfirmDelete from "../dialogs/confirmdelete";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

const PAGE_SIZE = 10;

export default function SupervisorsTable() {

  const router = useRouter()

  const [showdialog, setShowdialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState()
  const [isloading, setIsloading] = useState(false)
  

  const getUsers = async (page = 1) => {
    setIsloading(true)
    const res = await fetch("/api/users/filters", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        role: "supervisor",
        page,
        pageSize: PAGE_SIZE,
        searchQuery
      }),
    });

    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
      setTotal(data.total);
      setIsloading(false)
    } else {
      setIsloading(false)
      setError("Error fetching users");
    }
  };

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
    <div className="min-w-full max-h-full overflow-hidden text-sm bg-gray-200 rounded p-4 flex flex-col">
      <div className=" mb-4 flex gap-2  gap-2 flex items-center justify-end">
          <input className="border rounded border-gray-400  px-2 py-1 text-sm text-black"
              placeholder="Search"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              />
          <button className="px-2 rounded bg-blue-600 text-white flex py-1 text-sm gap-1 items-center justify-center"
            onClick={()=> getUsers(page)}>
              <MagnifyingGlassIcon />
              Search
          </button>
      </div>
      {isloading?
        <div className="flex w-full h-full items-center justify-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>:
        <table className="w-full">
        <tbody>
          <tr className="bg-blue-900 font-semibold text-white">
            <td className="px-1">#</td>
            <td className="px-1">Agent name</td>
            <td className="px-1">Phone Number</td>
            <td className="px-1 hidden md:block">Email</td>
            <td className="px-1">Action</td>
          </tr>
          {users.map((user, i) => (
            <tr className="border-b border-gray-300" key={i}>
              <td className="px-1">{(page - 1) * PAGE_SIZE + i + 1}</td>
              <td className="px-1">{`${user.firstname} ${user.surname}`}</td>
              <td className="px-1">{user.phonenumber}</td>
              <td className="px-1 hidden md:block">{user.email}</td>
              <td className="px-1">
                <button className="bg-blue-600 p-1 rounded flex items-center justify-center text-white"
                onClick={() => viewSupervisor(user._id)}>
                  <EyeOpenIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-blue-900 rounded text-white">
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button onClick={handleNextPage} disabled={page * PAGE_SIZE >= total} className="px-4 py-2 bg-blue-900 rounded text-white">
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
