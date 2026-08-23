import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * Displays a color-coded status indicator for Pending, Approved, Rejected, etc.
 * 
 * @param {string} status - 'Pending' | 'Approved' | 'Rejected' | 'Hold'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showDot - Whether to show colored dot (default true)
 */
const StatusBadge = ({ status = 'Pending', size = 'md', showDot = true, className = '' }) => {
  const normalizedStatus = (status || '').toLowerCase();
  
  return (
    <span className={`status-badge status-badge--${normalizedStatus} status-badge--${size} ${className}`}>
      {showDot && <span className="status-badge-dot"></span>}
      <span className="status-badge-text">{status}</span>
    </span>
  );
};

export default StatusBadge;
