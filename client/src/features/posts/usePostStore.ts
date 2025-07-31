import { create } from 'zustand';
import axios from 'axios';
import type { Post } from './types';

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  fetchPosts: () => Promise<void>;
  createPost: (postData: { title: string; description: string }) => Promise<void>;
  updatePost: (id: string, postData: { title?: string; content?: string }) => Promise<void>;
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
  
  fetchPosts: async () => {
    try {
      set({ isLoading: true });
      // Fetch all posts from API
      const response = await axios.get('/api/posts');
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  createPost: async (postData) => {
    try {
      set({ isLoading: true });
      const response = await axios.post('/api/posts', postData);
      // Add new post to state
      set(state => ({
        posts: [...state.posts, response.data],
        isLoading: false,
        isSuccess: true
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  updatePost: async (id, postData) => {
    try {
      set({ isLoading: true });
      const response = await axios.put(`/api/posts/${id}`, postData);
      // Update the post in state
      set(state => ({
        posts: state.posts.map(p => (p._id === id ? response.data : p)),
        isLoading: false,
        isSuccess: true
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  deletePost: async (id) => {
    try {
      set({ isLoading: true });
      await axios.delete(`/api/posts/${id}`);
      // Remove post from state
      set(state => ({
        posts: state.posts.filter(p => p._id !== id),
        isLoading: false,
        isSuccess: true
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data || error.message
      });
    }
  },
  
  reset: () => {
    set({ isLoading: false, isError: false, isSuccess: false, message: '' });
  }
}));