import { useAuthStore } from "@/stores/auth/useAuthStore";

export const getAuthHeaders = async () => {
  const token = useAuthStore.getState().user?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return config;
};
