import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import api from "@/utils/api";
const API_URL = "/users/auth/";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  user: any | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  register: (userData: RegisterData) => Promise<void>;
  login: (userData: LoginData) => Promise<void>;
  logout: () => void;
  reset: () => void;
}

// --- helper: safely get from localStorage ---
function getStoredUser() {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    localStorage.removeItem("user");
    return null;
  }
}

// --- helper: safely set to localStorage ---
function setStoredUser(user: any) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Failed to store user:", error);
  }
}

// --- helper: safely remove from localStorage ---
function removeStoredUser() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Failed to remove stored user:", error);
  }
}

// --- helper: decode JWT ---
function decodeToken(token: string) {
  try {
    return jwtDecode<{ exp: number }>(token);
  } catch {
    return null;
  }
}

// --- token watcher timeout reference ---
let logoutTimer: NodeJS.Timeout | null = null;

function clearLogoutTimer() {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
}

function startTokenWatcher(
  token: string,
  get: () => AuthState,
  isInitialization = false
): boolean {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return false;

  const expiresInMs = decoded.exp * 1000 - Date.now();

  // Clear any existing timer
  clearLogoutTimer();

  if (expiresInMs <= 0) {
    console.warn("⏰ Token expired — please login again...");
    // During initialization, show toast to inform user why they're logged out
    if (isInitialization) {
       // Use setTimeout to show toast after component mounts
      setTimeout(() => {
        toast.error("Your session has expired. Please login again.");
      }, 300);
      removeStoredUser();
      return false; // Signal that token was expired
    } else {
      // During runtime expiration
      toast.error("Your session has expired. Please login again.");
      get().logout();
      return false;
    }
  }

  logoutTimer = setTimeout(() => {
    console.warn("⏰ Token expired — auto logging out...");
    toast.error("Your session has expired. Please login again.");
    get().logout();
  }, expiresInMs);

  return true; // Signal that token is valid
}

// Create the auth store hook
export const useAuthStore = create<AuthState>((set, get) => {
  const storedUser = getStoredUser();
  let initialUser = storedUser;

  // Check if token is expired before setting initial state
  if (storedUser?.token) {
    const tokenIsValid = startTokenWatcher(storedUser.token, get, true);
    if (!tokenIsValid) {
      // Token was expired and cleaned up
      initialUser = null;
    }
  }

  return {
    user: initialUser,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",

    register: async (userData) => {
      try {
        set({ isLoading: true });
        const response = await api.post(API_URL + "register", userData);
        const newUser = response.data;
        setStoredUser(newUser);
        set({ user: newUser, isLoading: false, isSuccess: true });
        if (newUser?.token) {
          startTokenWatcher(newUser.token, get, false);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Registration failed";
        set({
          isLoading: false,
          isError: true,
          message: errorMessage,
          isSuccess: false,
        });
      }
    },

    login: async (userData) => {
      try {
        set({ isLoading: true });
        // Call your login API
        const response = await api.post(API_URL + "login", userData);
        const loggedInUser = response.data;
        setStoredUser(loggedInUser);
        set({ user: loggedInUser, isLoading: false, isSuccess: true });
        if (loggedInUser?.token) {
          startTokenWatcher(loggedInUser.token, get, false);
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || error.message || "Login failed";
        set({
          isLoading: false,
          isError: true,
          message: errorMessage,
          isSuccess: false,
        });
      }
    },

    logout: () => {
      removeStoredUser();
      clearLogoutTimer();
      set({ user: null, isError: false, isSuccess: false, message: "" });
    },

    reset: () => {
      set({ isLoading: false, isError: false, isSuccess: false, message: "" });
    },
  };
});
