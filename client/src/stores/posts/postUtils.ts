import type { Post, User } from './types';

// Type guard to check if user is populated (returns proper type)
export const isUserPopulated = (user: string | User): user is User => {
  return typeof user === 'object' && user !== null && 'name' in user;
};

// Utility function to get user name safely
export const getUserName = (post: Post): string | null => {
  if (!post.user) return null;
  
  if (isUserPopulated(post.user)) {
    return post.user.name || post.user.email;
  }
  
  return null;
};

// Utility function to get user display name
export const getUserDisplayName = (user: string | User): string => {
  if (isUserPopulated(user)) {
    return user.name || user.email || 'Unknown User';
  }
  return 'Unknown User';
};