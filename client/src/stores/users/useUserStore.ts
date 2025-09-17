import { create } from "zustand";
import api from "@/utils/api";

const API_URL = "/users/";

interface UserState {
  profile: any | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  getProfileByUsername: (username: string) => Promise<any | null>;
  reset: () => void;
}

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
      const response = await api.get(API_URL + username);
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
