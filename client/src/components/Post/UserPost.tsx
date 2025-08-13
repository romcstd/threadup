import { useEffect } from 'react';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { usePostStore } from '../../features/posts/usePostStore';
import { formatDistanceToNow } from 'date-fns';
import { Trash, Edit, Plus } from 'lucide-react';
import Spinner from '../../components/Spinner';
import type { Post } from '../../features/posts/types';
import { toast } from 'react-toastify';

const UserPost = () => {
  const userAuth = useAuthStore(state => state.user);
  
  const posts = usePostStore(state => state.posts);
  const fetchPosts = usePostStore(state => state.fetchPosts); // Fetch user's own posts
  const deletePost = usePostStore(state => state.deletePost);
  const resetPosts = usePostStore(state => state.reset);
  const isLoading = usePostStore(state => state.isLoading);
  const isError = usePostStore(state => state.isError);
  const isSuccess = usePostStore(state => state.isSuccess);
  const message = usePostStore(state => state.message);
  const actionType = usePostStore(state => state.actionType);

  useEffect(() => {
    if (userAuth) {
      fetchPosts(); // Fetch user's own posts
    }

    return () => {
      resetPosts();
    }
  }, [userAuth, fetchPosts, resetPosts]);

  useEffect(() => {
    if (isSuccess && actionType === 'delete') {
      toast.success('Post deleted successfully');
      resetPosts();
    }
    if (isError) {
      toast.error(message || 'An error occurred');
      resetPosts();
    }
  }, [isSuccess, isError, message, actionType, resetPosts]);

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  if (!userAuth) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl text-gray-600">Please log in to view your profile</h2>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <section className='user-profile'>
      <div className='user-profile-container'>
        {/* Profile Header */}
        <div className="profile-header">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 mt-2">Welcome back, {userAuth.name}!</p>
              <p className="text-sm text-gray-500">{userAuth.email}</p>
            </div>
            
            <button className="create-post-btn flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="mr-2" size={18} />
              New Post
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <div className="posts-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              My Posts ({posts.length})
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className='user-posts-grid'>
              {posts.map((post: Post) => (
                <div className='user-post-card' key={post._id}>
                  <div className="post-header">
                    <div className="italic text-sm text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </div>
                    
                    <div className="post-actions flex gap-2">
                      <button 
                        className="edit-btn p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <button 
                        className="delete-btn p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeletePost(post._id)}
                        title="Delete post"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="post-footer mt-4 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-400">
                      Created: {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-400" size={24} />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                You haven't created any posts yet
              </h3>
              <p className="text-gray-400 mb-6">
                Share your thoughts and ideas with the community
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserPost;