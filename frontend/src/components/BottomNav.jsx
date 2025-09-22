// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   IoHome,
//   IoAddCircle,
//   IoNotifications,
//   IoPerson,
//   // IoSettings,
//   IoShieldCheckmark,
// } from "react-icons/io5";
// import { useAuth } from "../context/AuthContext";

// export default function BottomNav() {
//   const { user } = useAuth();

//   const links = [
//     { to: "/home", label: "Home", icon: IoHome },
//     { to: "/add-vehicle", label: "Add", icon: IoAddCircle },
//     user && (user.role === "admin" || user.role === "superadmin")
//       ? { to: "/admin-panel", label: "Admin", icon: IoShieldCheckmark }
//       : { to: "/notifications", label: "Notif", icon: IoNotifications },
//     { to: "/profile", label: "Profile", icon: IoPerson },
//     // { to: "/home", label: "More", icon: IoSettings },
//   ];

//   return (
//     <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] lg:w-[50%] bg-white/90 backdrop-blur-md shadow-lg rounded-2xl py-2 border border-gray-200">
//       <div className="flex justify-between items-center px-4">
//         {links.map(({ to, label, icon: Icon }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex flex-col items-center text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 ease-in-out ${
//                 isActive
//                   ? "text-blue-600 bg-blue-50 scale-105"
//                   : "text-gray-600 hover:bg-gray-100 hover:scale-105"
//               }`
//             }
//           >
//             <Icon size={22} />
//             <span>{label}</span>
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoHome,
  IoAddCircle,
  IoPerson,
  IoShieldCheckmark,
  IoCarSport, // vehicle details icon
} from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

export default function BottomNav({ vehicleId }) {
  const { user } = useAuth();

  const links = [
    { to: "/home", label: "Home", icon: IoHome },
    { to: "/add-vehicle", label: "Add", icon: IoAddCircle },
    { to: vehicleId ? `/vehicle/${vehicleId}` : "/home", label: "Detail", icon: IoCarSport }, // ✅ always visible
    user && (user.role === "admin" || user.role === "superadmin")
      ? { to: "/admin-panel", label: "Admin", icon: IoShieldCheckmark }
      : null,
    { to: "/profile", label: "Profile", icon: IoPerson },
  ].filter(Boolean); // remove null if not admin

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] md:w-[70%] lg:w-[50%] bg-white/90 backdrop-blur-md shadow-lg rounded-2xl py-2 border border-gray-200">
      <div className="flex justify-between items-center px-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs font-medium px-3 py-2 rounded-lg transition-all duration-200 ease-in-out ${isActive
                ? "text-blue-600 bg-blue-50 scale-105"
                : "text-gray-600 hover:bg-gray-100 hover:scale-105"
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
