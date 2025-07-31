import { create } from 'zustand'
import axios from 'axios'

interface AuthState {
  user: any | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  login:    (userData: { email: string; password: string }) => Promise<void>;
  logout:   () => void;
  reset:    () => void;
}

// Create the auth store hook
export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'), // load from storage
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  
  register: async (userData) => {
    try {
      set({ isLoading: true });
      // Call your registration API (replace URL with your endpoint)
      const response = await axios.post('/api/auth/register', userData);
      const newUser = response.data;
      // On success, store user and update state
      localStorage.setItem('user', JSON.stringify(newUser));
      set({ user: newUser, isLoading: false, isSuccess: true });
    } catch (error: any) {
      // On error, set error flags and message
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  login: async (userData) => {
    try {
      set({ isLoading: true });
      // Call your login API
      const response = await axios.post('/api/auth/login', userData);
      const loggedInUser = response.data;
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      set({ user: loggedInUser, isLoading: false, isSuccess: true });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  logout: () => {
    // Remove user and update state
    localStorage.removeItem('user');
    set({ user: null });
  },
  
  reset: () => {
    // Reset flags and message
    set({ isLoading: false, isError: false, isSuccess: false, message: '' });
  }
}));