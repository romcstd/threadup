import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Share } from 'lucide-react';
import TimeStamp from '@/components/TimeStamp';
import { getUserDisplayName, isUserPopulated } from '@/features/posts/postUtils';
import type { Post } from '@/features/posts/types';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

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
    <Card className="p-0 gap-0">
      {/* Header */}
      <CardHeader className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
            <span className="text-secondary font-semibold text-sm">
              {isUserPopulated(post.user) ? (
                post.user.name ? post.user.name.charAt(0).toUpperCase() : 'U'
              ) : (
                'U'
              )}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="font-semibold text-primary text-sm leading-tight">
              {isUserPopulated(post.user) ? getUserDisplayName(post.user) : 'Unknown User'}
            </div>
            <TimeStamp
              date={post.createdAt}
              className="text-sm text-zinc-500 hover:underline cursor-pointer"
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
      </CardHeader>

      {/* Content */}
      <CardContent className="pb-4 pt-1 px-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </CardContent>

      <CardFooter className="border-t px-2 !py-2">
        <div className="flex items-center space-x-1">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-red-500 transition-colors">
            <Heart size={18} />
            <span className="text-zinc-500 text-sm font-medium">Like</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-blue-500 transition-colors">
            <MessageCircle size={18} />
            <span className="text-zinc-500 text-sm font-medium">Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:text-green-500 transition-colors ml-auto">
            <Share size={18} />
            <span className="text-zinc-500 text-sm font-medium">Share</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;