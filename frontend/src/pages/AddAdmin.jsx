import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import authService from "../services/authService";
import { toast } from "react-toastify";

export default function AddAdmin() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register({
        ...form,
        role: "admin", // force role as admin
        mobile: form.mobile, // backend expects "mobile"
      });

      toast.success("Admin created successfully");

      // reset form
      setForm({
        name: "",
        designation: "",
        mobile: "",
        email: "",
        address: "",
        password: "",
      });

      // navigate to admin panel
      navigate("/admin-panel");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create admin");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Add Admin</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          label="Member Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Designation"
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />
        <InputField
          label="Contact Number"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
}
