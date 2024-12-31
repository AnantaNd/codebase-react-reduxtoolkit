import { Navigate } from "react-router-dom";

function RoleBasedRoute({ children, role }) {
  // Mengambil data user dari localStorage dan mengelola kemungkinan kesalahan
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
    return e;
  }

  // Jika tidak ada user yang terautentikasi, arahkan ke login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Validasi apakah role yang dimiliki user sesuai dengan yang diinginkan
  if (!user.roles || user.roles.name !== role) {
    return <Navigate to="/" />;
  }

  // Jika semua kondisi terpenuhi, render children (halaman yang diminta)
  return children;
}

export default RoleBasedRoute;
