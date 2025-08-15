import { useEffect } from 'react';
import { usePostStore } from '@/features/posts/usePostStore';
import PostCard from '@/components/Post/PostCard';
import type { Post } from '@/features/posts/types';
import { toast } from 'react-toastify';

const AllPosts = () => {
  const posts = usePostStore(state => state.posts);
  const fetchAllPosts = usePostStore(state => state.fetchAllPosts);
  const resetPosts = usePostStore(state => state.reset);
  const isError = usePostStore(state => state.isError);
  const message = usePostStore(state => state.message);

  useEffect(() => {
    fetchAllPosts();
    return () => {
      resetPosts();
    }
  }, [fetchAllPosts, resetPosts]);

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Failed to fetch posts');
      resetPosts();
    }
  }, [isError, message, resetPosts]);

  return (
    <section className="max-w-2xl mx-auto px-4 py-6">
      {posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post: Post) => (
            <PostCard 
              key={post._id} 
              post={post}
              showActions={false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPosts;