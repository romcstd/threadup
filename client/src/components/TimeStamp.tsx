import React, { useState, useEffect } from 'react';
import { formatTimeAgo } from '@/utils/timeUtils';

interface TimeStampProps {
  date: string;
  className?: string;
  showTooltip?: boolean;
  variant?: 'compact' | 'detailed';
}

const TimeStamp: React.FC<TimeStampProps> = ({ 
  date, 
  className = '', 
  showTooltip = true,
  variant = 'compact'
}) => {
  const [timeAgo, setTimeAgo] = useState(formatTimeAgo(date));
  const [showFullDate, setShowFullDate] = useState(false);

  // Update time every minute for recent posts
  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatTimeAgo(date));
    };

    // Only update for recent posts (less than 24 hours)
    const postDate = new Date(date);
    const now = new Date();
    const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      const interval = setInterval(updateTime, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [date]);

  const fullDate = new Date(date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handleClick = () => {
    if (variant === 'detailed') {
      setShowFullDate(!showFullDate);
    }
  };

  const baseClasses = `
    text-sm text-gray-500 
    hover:text-gray-700 
    transition-colors duration-200
    ${variant === 'detailed' ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  if (showTooltip) {
    return (
      <span 
        className={baseClasses}
        title={fullDate}
        onClick={handleClick}
      >
        {showFullDate && variant === 'detailed' ? fullDate : timeAgo}
      </span>
    );
  }

  return (
    <span 
      className={baseClasses}
      onClick={handleClick}
    >
      {showFullDate && variant === 'detailed' ? fullDate : timeAgo}
    </span>
  );
};

export default TimeStamp;