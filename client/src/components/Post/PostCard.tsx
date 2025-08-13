import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import TimeStamp from '@/components/TimeStamp';
import { getUserDisplayName, isUserPopulated } from '@/features/posts/postUtils';
import type { Post } from '@/features/posts/types';

interface PostCardProps {
  post: Post;
  showActions?: boolean;
  currentUserId?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  showActions = false,
  currentUserId 
}) => {
  const isOwner = currentUserId && (
    typeof post.user === 'string' 
      ? post.user === currentUserId 
      : post.user._id === currentUserId
  );

  return (
    <article className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <header className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {isUserPopulated(post.user) ? (
                post.user.name ? post.user.name.charAt(0).toUpperCase() : 'U'
              ) : (
                'U'
              )}
            </span>
          </div>
          
          {/* Author info */}
          <div className="flex flex-col">
            <div className="font-semibold text-gray-900 text-sm leading-tight">
              {isUserPopulated(post.user) ? getUserDisplayName(post.user) : 'Unknown User'}
            </div>
            <TimeStamp 
              date={post.createdAt} 
              className="text-xs text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
              showTooltip={true}
            />
          </div>
        </div>

        {/* Menu button */}
        {(showActions || isOwner) && (
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        )}
      </header>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Footer with engagement buttons */}
      <footer className="border-t border-gray-100 px-4 py-2">
        <div className="flex items-center space-x-1">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={18} />
            <span className="text-sm font-medium">12</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-blue-500 transition-colors">
            <MessageCircle size={18} />
            <span className="text-sm font-medium">3</span>
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-green-500 transition-colors">
            <Share size={18} />
          </button>
          
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-600 hover:text-yellow-500 transition-colors ml-auto">
            <Bookmark size={18} />
          </button>
        </div>
      </footer>
    </article>
  );
};

export default PostCard;