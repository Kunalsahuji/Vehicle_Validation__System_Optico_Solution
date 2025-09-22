import React, { useState } from "react";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("security");
    const [err, setErr] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ mobile, password, role });
            navigate("/home");
        } catch (error) {
            setErr(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="mx-auto max-w-md bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            {err && <div className="mb-3 text-sm text-red-600">{err}</div>}
            <form onSubmit={handleLogin}>
                <label className="block text-sm mb-1">Role</label>
                <select className="mb-3 w-full p-2 border rounded" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="security">Security</option>
                </select>

                <InputField label="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button className="w-full mt-3 bg-accent text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
}
