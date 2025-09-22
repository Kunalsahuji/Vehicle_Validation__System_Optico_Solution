import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogIn } from "react-icons/fi";
import logo from "../../public/assets/vv.png";
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <div className=" rounded-lg flex items-center justify-center text-white font-bold">
            <img className="w-10 h-10"
            src={logo} alt="logo" />
          </div>
          <div>
            <div className="text-lg font-semibold ">Vehicle Validate</div>
            <div className="text-xs text-gray-500">Society Security</div>
          </div>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          {/* Register/Login (always visible if not logged in) */}
          {!user && (
            <Link
              to="/login"
              className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              <FiLogIn /> Register / Login
            </Link>
          )}

          {/* Admin Panel (visible only for superadmin/admin) */}
          {user && (user.role === "superadmin" || user.role === "admin") && (
            <Link
              to="/admin-panel"
              className="hidden md:inline-flex px-3 py-1.5 bg-primary text-white rounded"
            >
              Admin Panel
            </Link>
          )}

          {/* Bootstrap Super Admin (only when no user exists/logged in) */}
          {!user && (
            <Link
              to="/bootstrap-superadmin"
              className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              Bootstrap Super Admin
            </Link>
          )}

          {/* User Info & Logout */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-sm px-3 py-1 border rounded"
              >
                Logout
              </button>
              <Link to="/profile" className="p-2 rounded-full bg-gray-100">
                <FiUser />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="md:hidden p-2 rounded-full bg-gray-100"
            >
              <FiLogIn />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
