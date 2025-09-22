import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AdminPanel() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await adminService.getAdmins();
        setAdmins(res);
      } catch (error) {
        toast.error("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await adminService.deleteAdmin(id);
      setAdmins(admins.filter((a) => a._id !== id));
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin");
    }
  };

  if (loading) return <div>Loading admins...</div>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        {user.role === "superadmin" && (
          <Link
            to="/add-admin"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Admin
          </Link>
        )}
      </div>

      {admins.length === 0 ? (
        <p className="text-gray-600">No admins found.</p>
      ) : (
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full border-collapse rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr
                  key={a._id}
                  className={`border-b hover:bg-gray-50 ${
                    user._id === a._id ? "bg-yellow-50" : ""
                  }`}
                >
                  <td className="p-3">{a.name}</td>
                  <td className="p-3">{a.designation}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3">{a.mobile}</td>
                  <td className="p-3 capitalize">{a.role}</td>
                  <td className="p-3 flex justify-center gap-2">
                    {(user.role === "superadmin" ||
                      (user.role === "admin" && user._id === a._id)) && (
                      <button
                        onClick={() => navigate(`/admins/${a._id}/edit`)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                      >
                        <FiEdit /> Edit
                      </button>
                    )}
                    {user.role === "superadmin" && (
                      <button
                        onClick={() => handleDelete(a._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {admins.map((a) => (
          <div
            key={a._id}
            className={`border rounded p-4 shadow-sm ${
              user._id === a._id ? "bg-yellow-50" : "bg-gray-50"
            }`}
          >
            <h3 className="font-semibold text-lg">{a.name}</h3>
            <p className="text-sm text-gray-600">{a.designation}</p>
            <p className="text-sm">{a.email}</p>
            <p className="text-sm">📞 {a.mobile}</p>
            <p className="text-sm capitalize">Role: {a.role}</p>

            <div className="flex gap-2 mt-3">
              {(user.role === "superadmin" ||
                (user.role === "admin" && user._id === a._id)) && (
                <button
                  onClick={() => navigate(`/admins/${a._id}/edit`)}
                  className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center justify-center gap-1"
                >
                  <FiEdit /> Edit
                </button>
              )}
              {user.role === "superadmin" && (
                <button
                  onClick={() => handleDelete(a._id)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-1"
                >
                  <FiTrash2 /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
