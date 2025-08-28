import { useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import OwnProfile from '@/components/User/OwnProfile';
import UserProfile from '@/components/User/UserProfile';
export const Profile = () => {

  // Get the username from the URL parameters
  const { username } = useParams<{ username: string }>();

  // Get the authenticated user from the auth store
  const authUser = useAuthStore(state => state.user);

  const isOwnProfile = authUser?.username === username;

  return isOwnProfile ? <OwnProfile /> : <UserProfile username={username!} />;
};