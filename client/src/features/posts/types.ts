// User type
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Post type with populated user
export interface PostWithUser {
  _id: string;
  title: string;
  description: string;
  user: User; // Populated user object
  createdAt: string;
  updatedAt: string;
}

// Post type with user ID only
export interface Post {
  _id: string;
  title: string;
  description: string;
  user: string | User; // Can be either string ID or populated User object
  createdAt: string;
  updatedAt: string;
}

// Type guard to check if user is populated
export const isUserPopulated = (user: string | User): user is User => {
  return typeof user === 'object' && user !== null && 'name' in user;
}