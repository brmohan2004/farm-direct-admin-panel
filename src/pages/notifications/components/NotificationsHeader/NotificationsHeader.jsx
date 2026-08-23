import React from 'react';
import { CheckCheck, Trash2 } from 'lucide-react';
import './NotificationsHeader.css';

/**
 * NotificationsHeader Component
 * Bulk action controls for notifications page
 */
const NotificationsHeader = ({ unreadCount = 0, onMarkAllRead, onClearAll }) => {
  return (
    <div className="notifications-header">
      <div className="notifications-header-actions">
        {unreadCount > 0 && (
          <button
            type="button"
            className="notifications-action-btn notifications-mark-read-btn"
            onClick={onMarkAllRead}
          >
            <CheckCheck size={16} />
            <span>Mark all read ({unreadCount})</span>
          </button>
        )}
        <button
          type="button"
          className="notifications-action-btn notifications-clear-btn"
          onClick={onClearAll}
        >
          <Trash2 size={16} />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationsHeader;
