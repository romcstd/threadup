import { useEffect } from 'react';
import { usePostStore } from '@/features/posts/usePostStore';
import PostCard from '@/components/Post/PostCard';
import PostCardSkeleton from "@/components/Post/PostCardSkeleton";
import type { Post } from '@/features/posts/types';
import { toast } from 'react-toastify';

const AllPosts = () => {
  const posts = usePostStore(state => state.posts);
  const fetchAllPosts = usePostStore(state => state.fetchAllPosts);
  const resetPosts = usePostStore(state => state.reset);
  const isError = usePostStore(state => state.isError);
  const message = usePostStore(state => state.message);
  const isLoading = usePostStore(state => state.isLoading);

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

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <PostCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* Render posts */}
      {!isLoading && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post: Post) => (
            <PostCard key={post._id} post={post} showActions={false} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && posts.length === 0 && (
        <p className="text-center text-muted-foreground">No posts available</p>
      )}
    </section>
  );
};

export default AllPosts;