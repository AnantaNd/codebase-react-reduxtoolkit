import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import RoleBasedRoute from "./RoleBasedRoute";
import PrivateRoute from "./PrivateRoute";
import LayoutAdmin from "../layouts/admin/LayoutAdmin";

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
        <Route path="about" element={<AboutPage />} />
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
