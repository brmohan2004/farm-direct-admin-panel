import React from 'react';
import { Bell, MessageSquare } from 'lucide-react';
import './Notification.css';

const Notification = ({ count = 12, messageCount = 5 }) => {
  return (
    <div className="header-actions-group">
      <button className="icon-badge-btn" aria-label="Notifications">
        <Bell size={20} />
        {count > 0 && <span className="badge-counter">{count}</span>}
      </button>

      {messageCount !== undefined && messageCount > 0 && (
        <button className="icon-badge-btn desktop-only-action" aria-label="Messages">
          <MessageSquare size={20} />
          <span className="badge-counter secondary">{messageCount}</span>
        </button>
      )}
    </div>
  );
};

export default Notification;
