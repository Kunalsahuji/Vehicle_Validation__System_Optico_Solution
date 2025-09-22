import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import Login from "./pages/Login";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import AddVehicle from "./pages/AddVehicle";
import AddAdmin from "./pages/AddAdmin";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import BootstrapSuperAdmin from "./pages/BootstrapSuperAdmin";
import EditVehiclePage from "./pages/EditVehiclePage";   
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route
            path="/vehicle/:id/edit"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <EditVehiclePage />
              </ProtectedRoute>
            }
          />
          <Route path="/bootstrap-superadmin" element={<BootstrapSuperAdmin />} />

          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute roles={["superadmin", "admin"]}>
                <AddVehicle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-panel"
            element={
              user?.role === "superadmin" ? (
                <AdminPanel />
              ) : (
                <ProtectedRoute roles={["admin", "superadmin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              )
            }
          />

          <Route
            path="/add-admin"
            element={
              <ProtectedRoute roles={["superadmin"]}>
                <AddAdmin />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
};

export default App;
