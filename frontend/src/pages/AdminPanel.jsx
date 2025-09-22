import React, { useEffect, useState } from "react";
import adminService from "../services/adminService";
import { Link } from "react-router-dom";

export default function AdminPanel() {
    const [admins, setAdmins] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await adminService.getAdmins();
                setAdmins(res);
            } catch (error) {
                setErr("Cannot load admins");
            }
        })();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Admins</h3>
                <Link to="/add-admin" className="px-3 py-1 bg-accent text-white rounded">Add Admin</Link>
            </div>

            {err && <div className="text-red-600">{err}</div>}

            <div className="grid gap-3">
                {admins.map(a => (
                    <div key={a._id} className="bg-white p-3 rounded shadow flex justify-between">
                        <div>
                            <div className="font-medium">{a.name}</div>
                            <div className="text-sm text-gray-500">{a.email} • {a.mobile}</div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-2 py-1 border rounded">Edit</button>
                            <button className="px-2 py-1 border rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
