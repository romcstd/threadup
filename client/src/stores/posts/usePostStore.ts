import { create } from "zustand";
import axios from "axios";
import type { Post } from "./types";
import { getAuthHeaders } from "@/utils/getAuthHeaders";
const API_URL = import.meta.env.VITE_API_URL + "/api/posts/";

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  actionType: "create" | "delete" | "update" | null;
  fetchPosts: () => Promise<void>;
  fetchAllPosts: () => Promise<void>;
  getPostsByUsername: (username: string) => Promise<any | null>;
  createPost: (postData: { content: string }) => Promise<void>;
  updatePost: (id: string, postData: { content: string }) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  reset: () => void;
}

// Create the posts store hook
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  actionType: null,

  // fetches user-specific posts
  fetchPosts: async () => {
    try {
      set({ isLoading: true, isError: false, message: "" });
      const headers = await getAuthHeaders();
      const response = await axios.get(API_URL, headers);
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  // fetches all posts without authentication
  fetchAllPosts: async () => {
    try {
      set({ isLoading: true, isError: false, message: "" });
      const response = await axios.get(API_URL + "all");
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  getPostsByUsername: async (username: string) => {
    set({ isLoading: true, isError: false, message: "" });
    try {
      const response = await axios.get(API_URL + "user/" + username);
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  createPost: async (postData) => {
    try {
      set({ isLoading: true, isError: false, message: "", actionType: null });
      const headers = await getAuthHeaders();
      await axios.post(API_URL, postData, headers);
      await usePostStore.getState().fetchAllPosts();
      set({
        isLoading: false,
        isSuccess: true,
        actionType: "create",
      });
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  updatePost: async (id, postData) => {
    try {
      set({ isLoading: true, isError: false, message: "" });
      const headers = await getAuthHeaders();
      const response = await axios.put(API_URL + id, postData, headers);
      set((state) => ({
        posts: state.posts.map((p) => (p._id === id ? response.data : p)),
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  deletePost: async (id) => {
    try {
      set({ isLoading: true, isError: false, message: "", actionType: null });
      const headers = await getAuthHeaders();
      await axios.delete(API_URL + id, headers);
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== id),
        isLoading: false,
        isSuccess: true,
        actionType: "delete",
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        message: error.response?.data.message || error.message,
      });
    }
  },

  reset: () => {
    set({ isLoading: false, isError: false, isSuccess: false, message: "" });
  },
}));
