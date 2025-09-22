import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function EditAdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    address: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restrict admin from editing others
    if (user.role === "admin" && user._id !== id) {
      toast.error("You can only edit your own profile");
      navigate("/admin-panel");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const data = await adminService.getAdmin(id);
        setForm({
          name: data.name || "",
          designation: data.designation || "",
          email: data.email || "",
          mobile: data.mobile || "",
          address: data.address || "",
          role: data.role || "admin",
        });
      } catch (err) {
        toast.error("Failed to load admin");
        navigate("/admin-panel");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.updateAdmin(id, form);
      toast.success("Admin updated successfully");
      navigate("/admin-panel");
    } catch (err) {
      toast.error("Failed to update admin");
    }
  };

  if (loading) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6 mb-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Admin</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={user.role !== "superadmin"} // prevent role change for admin
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="admin">Admin</option>
              {user.role === "superadmin" && <option value="superadmin">Super Admin</option>}
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/admin-panel")}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
