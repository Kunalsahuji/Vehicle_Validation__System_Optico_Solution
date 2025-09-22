import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import Login from "./pages/Login";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import EditVehiclePage from "./pages/EditVehiclePage";
import AddVehicle from "./pages/AddVehicle";
import AddAdmin from "./pages/AddAdmin";
import AdminPanel from "./pages/AdminPanel";
import EditAdminPage from "./pages/EditAdminPage";
import Profile from "./pages/Profile";
import BootstrapSuperAdmin from "./pages/BootstrapSuperAdmin";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Scrollable main content */}
      <main className="flex-1 overflow-auto pt-20 pb-24 container mx-auto px-4">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/bootstrap-superadmin" element={<BootstrapSuperAdmin />} />

          {/* Vehicle routes (restricted) */}
          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle/:id/edit"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <EditVehiclePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Panel - only superadmin/admin */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Add admin - only superadmin */}
          <Route
            path="/add-admin"
            element={
              <ProtectedRoute roles={["superadmin"]}>
                <AddAdmin />
              </ProtectedRoute>
            }
          />

          {/* Edit admin - superadmin/admin */}
          <Route
            path="/admins/:id/edit"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <EditAdminPage />
              </ProtectedRoute>
            }
          />

          {/* Profile (all logged in users) */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {/* Fixed Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
