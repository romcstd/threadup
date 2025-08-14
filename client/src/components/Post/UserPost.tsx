import { useEffect, useState } from 'react';
import { useAuthStore } from '../../features/auth/useAuthStore';
import { usePostStore } from '../../features/posts/usePostStore';
import { formatDistanceToNow } from 'date-fns';
import { Trash, Edit, Plus, Heart, MessageCircle, MoreHorizontal, User } from 'lucide-react';
import type { Post } from '../../features/posts/types';
import { toast } from 'react-toastify';

const UserPost = () => {
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const userAuth = useAuthStore(state => state.user);
  
  const posts = usePostStore(state => state.posts);
  const fetchPosts = usePostStore(state => state.fetchPosts); // Assuming you have this action
  const deletePost = usePostStore(state => state.deletePost);
  const updatePost = usePostStore(state => state.updatePost);
  const resetPosts = usePostStore(state => state.reset);
  const isLoading = usePostStore(state => state.isLoading);
  const isError = usePostStore(state => state.isError);
  const isSuccess = usePostStore(state => state.isSuccess);
  const message = usePostStore(state => state.message);
  const actionType = usePostStore(state => state.actionType);

  // Filter posts to show only user's posts (in case fetchPosts gets all posts)
  // const userPosts = posts.filter(post => post.user._id === userAuth?.id || post.user === userAuth?.id);

  useEffect(() => {
    if (userAuth) {
      fetchPosts(); // Fetch user's own posts
    }

    return () => {
      resetPosts();
    }
  }, [userAuth, fetchPosts, resetPosts]);

  useEffect(() => {
    if (isSuccess && (actionType === 'delete' || actionType === 'update')) {
      toast.success(
        actionType === 'delete' 
          ? 'Post deleted successfully' 
          : 'Post updated successfully'
      );
      setEditingPost(null);
      setEditContent('');
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

  const handleEditPost = (post: Post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const handleSaveEdit = (postId: string) => {
    if (!editContent.trim()) {
      toast.error('Content cannot be empty');
      return;
    }
    
    updatePost(postId, { content: editContent.trim() });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  if (!userAuth) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl text-gray-600">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <section className='user-profile'>
      <div className='user-profile-container max-w-2xl mx-auto p-4'>
        {/* Profile Header */}
        <div className="profile-header bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userAuth.name}</h1>
                <p className="text-gray-600">{userAuth.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="posts-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              My Posts
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className='space-y-4'>
              {posts.map((post: Post) => (
                <article className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden' key={post._id}>
                  {/* Post Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center">
                          <User className="text-white" size={16} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {typeof post.user === 'object' ? post.user.name : userAuth.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => handleEditPost(post)}
                          title="Edit post"
                        >
                          <Edit size={16} />
                        </button>
                        
                        <button 
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => handleDeletePost(post._id)}
                          title="Delete post"
                        >
                          <Trash size={16} />
                        </button>
                        
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    {editingPost === post._id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="What's on your mind?"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(post._id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                    )}
                  </div>

                  {/* Post Actions */}
                  {editingPost !== post._id && (
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                            <Heart size={18} />
                            <span className="text-sm">Like</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <MessageCircle size={18} />
                            <span className="text-sm">Comment</span>
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="text-gray-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-3">
                No posts yet
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven't created any posts yet. Share your thoughts and ideas with the community!
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
                <Plus className="mr-2" size={18} />
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserPost;