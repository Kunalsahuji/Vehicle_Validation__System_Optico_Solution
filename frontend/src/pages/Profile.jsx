import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user } = useAuth();
    if (!user) return <div>Please login</div>;
    return (
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Mobile:</strong> {user.mobile}</div>
        </div>
    );
}
