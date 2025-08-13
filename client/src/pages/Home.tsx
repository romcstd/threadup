import { useEffect } from 'react';
import { useAuthStore } from '../features/auth/useAuthStore';
import AuthIntro from '@/components/AuthIntro';
import CreatePostForm from '@/components/Post/CreatePostForm';
import AllPosts from '@/components/Post/AllPosts';

export const Home = () => {
  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    }
  }, [reset]);

  return (
    <>
      {/* Show AuthIntro only for non-authenticated users */}
      {!user && <AuthIntro />}

      {/* Show CreatePostForm only for authenticated users */}
      {user && <CreatePostForm />}

      {/* Always show AllPosts */}
      <AllPosts />
    </>
  );
};