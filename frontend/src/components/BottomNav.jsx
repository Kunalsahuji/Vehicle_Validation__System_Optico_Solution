import React from "react";
import { Link } from "react-router-dom";
import { IoHome, IoAddCircle, IoNotifications, IoPerson, IoSettings } from "react-icons/io5";

export default function BottomNav() {
  return (
    <div className="fixed bottom-3 w-full shadow-lg rounded-xl py-2">
      <div className="flex justify-between items-center px-6">
        {/* Each link has a fixed base style to avoid layout shift */}
        <Link
          to="/home"
          className="flex flex-col items-center text-sm px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent hover:scale-105"
        >
          <IoHome size={22} />
          <span>Home</span>
        </Link>

        <Link
          to="/add-vehicle"
          className="flex flex-col items-center text-sm px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent hover:scale-105"
        >
          <IoAddCircle size={22} />
          <span>Add</span>
        </Link>

        <Link
          to="/notifications"
          className="flex flex-col items-center text-sm px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent hover:scale-105"
        >
          <IoNotifications size={22} />
          <span>Notif</span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center text-sm px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent hover:scale-105"
        >
          <IoPerson size={22} />
          <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className="flex flex-col items-center text-sm px-3 py-2 rounded-lg border border-transparent transition-all duration-200 ease-in-out hover:bg-accent hover:border-accent hover:scale-105"
        >
          <IoSettings size={22} />
          <span>More</span>
        </Link>
      </div>
    </div>
  );
}
