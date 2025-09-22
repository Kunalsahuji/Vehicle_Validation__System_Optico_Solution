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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="p-3 font-medium w-1/3">Name</td>
              <td className="p-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="p-3 font-medium">Designation</td>
              <td className="p-3">
                <input
                  type="text"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="p-3 font-medium">Email</td>
              <td className="p-3">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="p-3 font-medium">Contact Number</td>
              <td className="p-3">
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="p-3 font-medium">Address</td>
              <td className="p-3">
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="p-3 font-medium">Role</td>
              <td className="p-3">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={user.role !== "superadmin"} // 🔒 prevent role change
                  className="w-full border px-3 py-2 rounded disabled:bg-gray-100"
                >
                  <option value="admin">Admin</option>
                  {user.role === "superadmin" && (
                    <option value="superadmin">Super Admin</option>
                  )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/admin-panel")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
