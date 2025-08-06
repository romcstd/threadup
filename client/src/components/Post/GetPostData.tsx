import { useEffect } from 'react';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { usePostStore } from '../../features/posts/usePostStore';
import { formatDistanceToNow } from 'date-fns';
import { Trash } from 'lucide-react';
import Spinner from '../../components/Spinner';
import type { Post } from '../../features/posts/types';
import { toast } from 'react-toastify';

const GetPostData = () => {

  const userAuth = useAuthStore(state => state.user);
  const resetAuth = useAuthStore(state => state.reset);

  const posts = usePostStore(state => state.posts);
  const fetchPosts = usePostStore(state => state.fetchPosts);
  const deletePost = usePostStore(state => state.deletePost);
  const resetPosts = usePostStore(state => state.reset);
  const isLoading = usePostStore(state => state.isLoading);
  const isError = usePostStore(state => state.isError);
  const isSuccess = usePostStore(state => state.isSuccess);
  const message = usePostStore(state => state.message);
  const actionType = usePostStore(state => state.actionType);

  useEffect(() => {

    if (userAuth) {
      fetchPosts();
    }

    return () => {
      resetAuth();
      resetPosts();
    }
  }, [userAuth, fetchPosts, resetAuth, resetPosts]);

  useEffect(() => {
    if (isSuccess && actionType === 'delete') {
      toast.success(message || 'Post deleted successfully');
      resetPosts();
    }
    if (isError) {
      toast.error(message || 'An error occurred');
      resetPosts();
    }
  }, [isSuccess, isError, message, actionType, resetPosts]);

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
                  <h2 className="text-xl text-dark">{post.title}</h2>
                  <p className="text-gray-500">{post.description}</p>
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