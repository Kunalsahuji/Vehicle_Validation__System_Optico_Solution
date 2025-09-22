import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles.length && !roles.includes(user.role)) {
        return <div className="text-center py-10">Access Denied</div>;
    }

    return children;
}
