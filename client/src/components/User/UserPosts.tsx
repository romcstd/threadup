import type { FC } from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Trash, Edit, Plus, Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import TimeStamp from '@/components/TimeStamp';
import type { Post } from '@/stores/posts/types';
import { Button } from '@/components/ui/button';
import EmptyPost from '@/assets/post/empty-post.svg';
import { getUserDisplayName, isUserPopulated } from '@/stores/posts/postUtils';
interface UserPostsProps {
  posts: Post[];
  isOwnProfile: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

const UserPosts: FC<UserPostsProps> = ({ posts, isOwnProfile, onEdit, onDelete }) => {
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (post: Post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
    onEdit?.(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  if (!posts || posts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center">
          <div className="mb-6 flex justify-center">
            <img src={EmptyPost} alt="Empty Post" className="w-48" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-medium text-zinc-600 mb-3">No posts yet</h3>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              {isOwnProfile
                ? "You haven't created any posts yet. Share your thoughts!"
                : "This user hasn't posted anything yet."}
            </p>
          </div>
          {isOwnProfile && (
            <Button size="lg">
              <Plus /> Create Your First Post
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card className="p-0 gap-0" key={post._id}>
          <CardHeader className="flex items-center justify-between p-4 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center">
                {isUserPopulated(post.user) ? post.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="font-semibold text-primary text-sm leading-tight">
                  {isUserPopulated(post.user) ? getUserDisplayName(post.user) : 'Unknown User'}

                </h3>
                <p className="text-sm text-zinc-500">
                  <TimeStamp date={post.createdAt} className="text-sm text-zinc-500" showTooltip />
                </p>
              </div>
            </div>

            {isOwnProfile && (
              <div className="flex items-center space-x-1">
                <button
                  className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleEdit(post)}
                  title="Edit post"
                >
                  <Edit size={16} />
                </button>
                <button
                  className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => onDelete?.(post._id)}
                  title="Delete post"
                >
                  <Trash size={16} />
                </button>
                <button className="p-2 text-zinc-500 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
          </CardHeader>

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
                  <button onClick={handleCancelEdit} className="px-4 py-2 text-zinc-600 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            )}
          </CardContent>

          {editingPost !== post._id && (
            <CardFooter className="border-t px-2 !py-2">
              <div className="flex items-center space-x-1">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-red-500">
                  <Heart size={18} /> <span className="text-zinc-500 text-sm font-medium">Like</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-blue-500">
                  <MessageCircle size={18} /> <span className="text-zinc-500 text-sm font-medium">Comment</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-zinc-600 hover:text-green-500 ml-auto">
                  <Share size={18} /> <span className="text-zinc-500 text-sm font-medium">Share</span>
                </button>
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default UserPosts;
