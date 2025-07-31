import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { usePostStore } from '../../features/posts/usePostStore';
import { formatDistanceToNow } from 'date-fns';
import { Trash } from 'lucide-react';
import Spinner from '../../components/Spinner';
import type { Post } from '../../features/posts/types';

const GetPostData = () => {
  const navigate = useNavigate();

  const { userAuth, resetAuth } = useAuthStore((state) => ({
    userAuth: state.user,
    resetAuth: state.reset,
  }));

  const { posts, isLoading, isError, message, fetchPosts, deletePost, reset: resetPosts } = usePostStore((state) => ({
    posts: state.posts,
    isLoading: state.isLoading,
    isError: state.isError,
    message: state.message,
    fetchPosts: state.fetchPosts,
    deletePost: state.deletePost,
    reset: state.reset,
  }));

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!userAuth) {
      navigate('/');
    }

    fetchPosts();

    return () => {
      resetAuth();
      resetPosts();
    }
  }, [userAuth, navigate, isError, message, fetchPosts, resetAuth, resetPosts]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='get-post'>
      <div className='get-post-container'>
        {posts.length > 0 ? (
          <div className='get-post-row'>
            {posts.map((post: Post) => (
              <div className='get-post-column' key={post._id}>
                <div className='get-post-card'>
                  <div className="italic text-sm text-gray-500 mb-4">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </div>
                  <h2>{post.title}</h2>
                  <h2>{post.description}</h2>
                  <div
                    className="get-post-card-delete-button"
                    onClick={() => deletePost(post._id)}
                  >
                    <Trash className="mr-1" />Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have not set any posts</h3>
        )}
      </div>
    </section>
  )
}

export default GetPostData;