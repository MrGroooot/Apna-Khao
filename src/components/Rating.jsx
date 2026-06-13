import React from 'react';

const Rating = ({ value, count }) => {
  const stars = [];
  const floorVal = Math.floor(value);
  const hasHalf = value % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= floorVal) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gold fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (i === floorVal + 1 && hasHalf) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-0.5">{stars}</div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 ml-1.5 font-medium">({count} reviews)</span>
      )}
    </div>
  );
};

export default Rating;
