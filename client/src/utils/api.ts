import axios from "axios";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

// Attach Authorization header
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Handle expired tokens
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message?.toLowerCase() || "";
    if (
      err.response?.status === 401 &&
      (msg.includes("jwt expired") || msg.includes("expired"))
    ) {
      const { user, logout } = useAuthStore.getState();
      if (user) {
        toast.error("Your session has expired. Please login again.");
        logout(); // clear zustand + localStorage
      }
    }
    return Promise.reject(err);
  }
);

export default api;
