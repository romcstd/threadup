import { create } from 'zustand';
import axios from 'axios';
import type { Post } from './types';
import { useAuthStore } from '../auth/useAuthStore';

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  actionType: 'create' | 'delete' | 'update' | null;
  fetchPosts: () => Promise<void>; // Fetch user's own posts
  fetchAllPosts: () => Promise<void>; // Fetch all posts (public)
  createPost: (postData: { title: string; description: string }) => Promise<void>;
  updatePost: (id: string, postData: { title?: string; description?: string }) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the posts store hook
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  actionType: null,
  
  // Existing function - fetches user-specific posts
  fetchPosts: async () => {
    try {
      set({ isLoading: true, isError: false, message: '' });

      const token = useAuthStore.getState().user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get('/api/posts', config);
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message
      });
    }
  },

  // New function - fetches all posts without authentication
  fetchAllPosts: async () => {
    try {
      set({ isLoading: true, isError: false, message: '' });

      // No authentication headers needed for public posts
      const response = await axios.get('/api/posts/all');
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message
      });
    }
  },
  
  createPost: async (postData) => {
    try {
      set({ isLoading: true, isError: false, message: '', actionType: null });

      const token = useAuthStore.getState().user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.post('/api/posts', postData, config);
      set(state => ({
        posts: [...state.posts, response.data],
        isLoading: false,
        isSuccess: true,
        actionType: 'create'
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message
      });
    }
  },
  
  updatePost: async (id, postData) => {
    try {
      set({ isLoading: true, isError: false, message: '' });

      const token = useAuthStore.getState().user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(`/api/posts/${id}`, postData, config);
      set(state => ({
        posts: state.posts.map(p => (p._id === id ? response.data : p)),
        isLoading: false,
        isSuccess: true
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message
      });
    }
  },
  
  deletePost: async (id) => {
    try {
      set({ isLoading: true, isError: false, message: '', actionType: null });

      const token = useAuthStore.getState().user?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`/api/posts/${id}`, config);
      set(state => ({
        posts: state.posts.filter(p => p._id !== id),
        isLoading: false,
        isSuccess: true,
        actionType: 'delete'
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message
      });
    }
  },
  
  reset: () => {
    set({ isLoading: false, isError: false, isSuccess: false, message: '' });
  }
}));