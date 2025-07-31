import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'
import HomeBanner from '../components/HomeBanner';

const Home = () => {

  const navigate = useNavigate()
  const { user, reset } = useAuthStore((state) => ({
    user: state.user,
    reset: state.reset,
  }));

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => {
      reset();
    }
  }, [user, navigate, reset]);

  return (
    <>
      <HomeBanner />
    </>
  );
};

export default Home;