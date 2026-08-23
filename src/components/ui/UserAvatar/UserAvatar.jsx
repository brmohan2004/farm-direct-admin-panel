import React from 'react';
import './UserAvatar.css';

/**
 * UserAvatar Component
 * Displays user profile avatar using asset image or formatted initials avatar
 *
 * @param {string} src - Avatar image path from assets
 * @param {string} name - User's full name (for alt & fallback initials)
 * @param {string} size - 'sm' (32px) | 'md' (40px) | 'lg' (48px) | 'xl' (80px)
 */
const UserAvatar = ({ src, name = 'User', size = 'md', className = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getRandomBg = (str) => {
    const bgColors = [
      '#e0f2fe', '#dcfce7', '#fef3c7', '#faf5ff', '#fee2e2', '#f3e8ff'
    ];
    const textColors = [
      '#0284c7', '#16a34a', '#d97706', '#9333ea', '#dc2626', '#7e22ce'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % bgColors.length;
    return { bg: bgColors[index], text: textColors[index] };
  };

  const { bg, text } = getRandomBg(name);

  return (
    <div className={`user-avatar user-avatar--${size} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="user-avatar-img" />
      ) : (
        <div
          className="user-avatar-initials"
          style={{ backgroundColor: bg, color: text }}
        >
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
