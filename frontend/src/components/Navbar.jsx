import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogIn, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            V
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">
              Vehicle Validate
            </div>
            <div className="text-xs text-gray-500">Society Security</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-100 transition"
            >
              <FiLogIn /> Register / Login
            </Link>
          )}

          {user && (user.role === "superadmin" || user.role === "admin") && (
            <Link
              to="/admin-panel"
              className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Admin Panel
            </Link>
          )}

          {!user && (
            <Link
              to="/bootstrap-superadmin"
              className="flex items-center gap-2 text-sm px-3 py-1.5 border rounded hover:bg-gray-100 transition"
            >
              Bootstrap Super Admin
            </Link>
          )}

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
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <FiUser />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg border hover:bg-gray-100"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-sm p-4 space-y-3">
          {!user && (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm px-3 py-2 border rounded hover:bg-gray-100"
              onClick={() => setMobileMenu(false)}
            >
              <FiLogIn /> Register / Login
            </Link>
          )}

          {user && (user.role === "superadmin" || user.role === "admin") && (
            <Link
              to="/admin-panel"
              className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setMobileMenu(false)}
            >
              Admin Panel
            </Link>
          )}

          {!user && (
            <Link
              to="/bootstrap-superadmin"
              className="flex items-center gap-2 text-sm px-3 py-2 border rounded hover:bg-gray-100"
              onClick={() => setMobileMenu(false)}
            >
              Bootstrap Super Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="block text-sm text-gray-700">
                Hi, {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMobileMenu(false);
                }}
                className="w-full text-sm px-3 py-2 border rounded hover:bg-gray-100 block"
              >
                Logout
              </button>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setMobileMenu(false)}
              >
                Profile
              </Link>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
}
