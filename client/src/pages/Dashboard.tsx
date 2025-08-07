import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/useAuthStore';
import CreatePostForm from '../components/Post/CreatePostForm';
import GetPostData from '../components/Post/GetPostData';

export const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <section>
      {user && <h1 className="text-2xl text-dark font-bold mb-4">Welcome, {user.name}!</h1>}
      <CreatePostForm />
      <GetPostData />
    </section>
  );
};