import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/admin/Home";
import AboutPage from "../pages/About";
import RoleBasedRoute from "./RoleBasedRoute";
import PrivateRoute from "./PrivateRoute";
import LayoutAdmin from "../layouts/admin/LayoutAdmin";
import MegalosPage from "../pages/admin/Megalos";
import UserPage from "../pages/admin/User";
import AssignmentPage from "../pages/admin/Assignment";

function AppRoutes() {
  return (
    <Routes>
      {/* Route untuk halaman login */}
      <Route
        path="/login"
        element={
          <PrivateRoute>
            <LoginPage />
          </PrivateRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <RoleBasedRoute role="admin">
            <LayoutAdmin />
          </RoleBasedRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="megalos" element={<MegalosPage />} />
        <Route path="management-user" element={<UserPage />} />
        <Route path="assignment" element={<AssignmentPage />} />
        {/* Jika path /admin kosong atau dihapus, arahkan ke /admin/home */}
        <Route path="*" element={<Navigate to="/admin/home" />} />
      </Route>

      {/* Halaman untuk customer */}
      <Route
        path="/about"
        element={
          <RoleBasedRoute role="customer">
            <AboutPage />
          </RoleBasedRoute>
        }
      />

      {/* Route default jika path tidak cocok */}
      <Route path="*" element={<Navigate to="/admin/home" />} />
    </Routes>
  );
}

export default AppRoutes;
