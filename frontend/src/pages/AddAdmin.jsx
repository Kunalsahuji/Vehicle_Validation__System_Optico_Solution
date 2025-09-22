import React, { useState } from "react";
import InputField from "../components/InputField";
import authService from "../services/authService";

export default function AddAdmin() {
    const [form, setForm] = useState({ name: "", designation: "", contactNumber: "", email: "", address: "", password: "" });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register({ ...form, role: "admin", mobile: form.contactNumber });
            setMsg("Admin created");
            setForm({ name: "", designation: "", contactNumber: "", email: "", address: "", password: "" });
        } catch (error) {
            setMsg(error.response?.data?.message || "Failed to create");
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Add Admin</h3>
            {msg && <div className="mb-2 text-sm">{msg}</div>}
            <form onSubmit={handleSubmit}>
                <InputField label="Member Name" name="name" value={form.name} onChange={handleChange} required />
                <InputField label="Designation" name="designation" value={form.designation} onChange={handleChange} />
                <InputField label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                <InputField label="Address" name="address" value={form.address} onChange={handleChange} />
                <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
                <button className="mt-3 px-4 py-2 bg-accent text-white rounded">Create Admin</button>
            </form>
        </div>
    );
}
