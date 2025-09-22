import React, { useState } from "react";
import InputField from "../components/InputField";
import API from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function BootstrapSuperAdmin() {
    const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/bootstrap-superadmin", form);
            setMsg("Super Admin created successfully. You can now login.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMsg(error.response?.data?.message || "Failed to create Super Admin");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-3">Bootstrap Super Admin</h2>
            {msg && <div className="mb-3 text-sm text-blue-600">{msg}</div>}
            <form onSubmit={handleSubmit}>
                <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                <InputField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
                <button className="w-full mt-3 bg-accent text-white py-2 rounded">Create Super Admin</button>
            </form>
        </div>
    );
}
