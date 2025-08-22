import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "../auth/useAuthStore";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/users",
  withCredentials: true, // for refresh cookies
});

interface UserState {
  profile: any | null; // currently viewed profile
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  getProfileByUsername: (username: string) => Promise<any | null>;
  reset: () => void;
}

// Helper to get headers with a valid token
const getAuthHeaders = async () => {
  const authUser = useAuthStore.getState().user;
  let token = authUser?.accessToken;

  // Refresh if no token or expired (assume refresh handles expiry)
  if (!token) {
    const refreshed = await useAuthStore.getState().refresh();
    token = refreshed?.accessToken;
  }

  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",

  // Fetch any profile by username
  getProfileByUsername: async (username: string) => {
    set({ isLoading: true, isError: false, message: "" });
    try {
      const headers = await getAuthHeaders();
      const response = await API.get(`/${username}`, headers);
      set({ profile: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      set({
        profile: null,
        isLoading: false,
        isError: true,
        message: error.response?.data?.message || error.message,
      });
      return null;
    }
  },

  reset: () =>
    set({ profile: null, isLoading: false, isError: false, message: "" }),
}));
