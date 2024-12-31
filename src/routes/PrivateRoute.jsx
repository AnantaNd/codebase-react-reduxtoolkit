import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let user;

  // Coba mengambil user dari localStorage dan menangani potensi kesalahan saat parsing
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null; // Jika parsing gagal, anggap tidak ada user
    return e;
  }

  // Jika user ada (sudah login), arahkan sesuai dengan role mereka
  if (user) {
    if (user.roles && user.roles.name === "admin") {
      // Jika role adalah admin, arahkan ke halaman admin utama
      return <Navigate to="/admin/home" />;
    } else if (user.roles && user.roles.name === "customer") {
      // Jika role adalah customer, arahkan ke halaman about
      return <Navigate to="/about" />;
    }
  }

  // Jika tidak ada user (belum login), tampilkan halaman yang diminta (children)
  return children;
}

export default PrivateRoute;
