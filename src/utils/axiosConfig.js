import axios from "axios";
import { redirect } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "https://example.com/api", // Ganti dengan base URL API Anda
  timeout: 10000, // Waktu timeout (opsional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menangani token (opsional)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status == 401) {
      console.log(err);
      redirect("/login");
      localStorage.clear();
      return Promise.reject(err);
    }
  }
);

export default apiClient;
