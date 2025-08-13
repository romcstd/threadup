export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'now';
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  }

  // Less than a year
  if (diffInSeconds < 31536000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    if (weeks < 4) {
      return `${weeks}w`;
    }
    // Show actual date for posts older than a month
    return postDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  // More than a year
  return postDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

// Alternative version with more detailed recent times (like Reddit)
export const formatTimeAgoDetailed = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  // Show actual date for older posts
  return postDate.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};