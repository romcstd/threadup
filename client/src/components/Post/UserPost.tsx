import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { usePostStore } from '@/stores/posts/usePostStore';
import TimeStamp from '@/components/TimeStamp';
import { Trash, Edit, Plus, Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import type { Post } from '@/stores/posts/types';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const UserPost = () => {
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const navigate = useNavigate();

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

  useEffect(() => {

    if (!userAuth) {
      navigate('/login'); // redirect to login page
    } else {
      fetchPosts();
    }

    return () => {
      resetPosts();
    }
  }, [userAuth, fetchPosts, navigate, resetPosts]);

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
        <h2 className="text-xl text-zinc-600">Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <section className='user-profile'>
      <div className='user-profile-container max-w-2xl mx-auto p-4'>
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">{userAuth.name}</h1>
                <p className="text-primary">{userAuth.email}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Section */}
        <div className="posts-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">
              My Posts
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className='space-y-4'>
              {posts.map((post: Post) => (
                <Card className="p-0 gap-0" key={post._id}>
                  {/* Post Header */}
                  <CardHeader className="flex items-center justify-between p-4 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center">
                        <User className="text-white" size={16} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary text-sm leading-tight">
                          {typeof post.user === 'object' ? post.user.name : userAuth.name}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          <TimeStamp
                            date={post.createdAt}
                            className="text-sm text-zinc-500 hover:underline cursor-pointer"
                            showTooltip={true}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => handleEditPost(post)}
                        title="Edit post"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => handleDeletePost(post._id)}
                        title="Delete post"
                      >
                        <Trash size={16} />
                      </button>

                      <button className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </CardHeader>

                  {/* Post Content */}
                  <CardContent className="p-4">
                    {editingPost === post._id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder="What's on your mind?"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-zinc-600 hover:bg-gray-100 rounded-lg transition-colors"
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
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                    )}
                  </CardContent>

                  {/* Post Actions */}
                  {editingPost !== post._id && (
                    <CardFooter className="border-t px-2 !py-2">
                      <div className="flex items-center space-x-1">
                        <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-red-500 transition-colors">
                          <Heart size={18} />
                          <span className="text-zinc-500 text-sm font-medium">Like</span>
                        </button>

                        <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-blue-500 transition-colors">
                          <MessageCircle size={18} />
                          <span className="text-zinc-500 text-sm font-medium">Comment</span>
                        </button>

                        <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-green-500 transition-colors ml-auto">
                          <Share size={18} />
                          <span className="text-zinc-500 text-sm font-medium">Share</span>
                        </button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="text-zinc-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-medium text-zinc-600 mb-3">
                  No posts yet
                </h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                  You haven't created any posts yet. Share your thoughts and ideas with the community!
                </p>
                <Button size="lg">
                  <Plus /> Create Your First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserPost;