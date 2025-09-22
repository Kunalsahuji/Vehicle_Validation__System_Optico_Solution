import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiShield } from "react-icons/fi";

export default function Profile() {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Please login to view your profile.
      </div>
    );

  // Determine edit link for admin/superadmin
  const editLink =
    user.role === "admin" || user.role === "superadmin"
      ? `/admins/${user._id}/edit`
      : null;

  return (
    <div className="flex justify-center mt-10 mb-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 md:p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl text-white font-bold mb-4">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.role.toUpperCase()}</p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <FiMail className="text-blue-500 text-xl" />
            <span className="text-gray-700 font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <FiPhone className="text-green-500 text-xl" />
            <span className="text-gray-700 font-medium">{user?.mobile || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FiShield className="text-purple-500 text-xl" />
            <span className="text-gray-700 font-medium">{user.role}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {editLink && (
            <Link
              to={editLink}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </Link>
          )}
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
