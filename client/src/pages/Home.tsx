import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/useAuthStore';
import AuthIntro from '../components/AuthIntro';

export const Home = () => {

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.reset);

  // Redirect if authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      reset();
    }
  }, [reset]);

  return (
    <>
      <AuthIntro />
    </>
  );
};