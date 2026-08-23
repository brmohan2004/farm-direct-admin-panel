import React from 'react';
import { ShoppingBag, UserPlus, Inbox, ShieldCheck, Bell, Clock, ChevronRight, Check } from 'lucide-react';
import './NotificationsList.css';

const getNotificationIcon = (category) => {
  switch (category) {
    case 'orders':
      return { icon: ShoppingBag, bg: '#dcfce7', color: '#16a34a' };
    case 'farmers':
      return { icon: UserPlus, bg: '#e0e7ff', color: '#4f46e5' };
    case 'stock':
      return { icon: Inbox, bg: '#fef3c7', color: '#d97706' };
    case 'system':
      return { icon: ShieldCheck, bg: '#f3e8ff', color: '#7c3aed' };
    default:
      return { icon: Bell, bg: '#f3f4f6', color: '#4b5563' };
  }
};

/**
 * NotificationsList Component
 * Renders list of notification cards with status badges and actions
 */
const NotificationsList = ({ notifications = [], onMarkAsRead, onDelete }) => {
  if (notifications.length === 0) {
    return (
      <div className="notifications-empty-state">
        <Bell size={40} className="notifications-empty-icon" />
        <h3 className="notifications-empty-title">No Notifications Found</h3>
        <p className="notifications-empty-desc">You are all caught up! There are no notifications to display right now.</p>
      </div>
    );
  }

  return (
    <div className="notifications-list">
      {notifications.map((item) => {
        const { icon: IconComponent, bg, color } = getNotificationIcon(item.category);

        return (
          <div
            key={item.id}
            className={`notification-card ${item.unread ? 'notification-card--unread' : ''}`}
          >
            <div className="notification-card-left">
              <div
                className="notification-icon-badge"
                style={{ backgroundColor: bg }}
              >
                <IconComponent size={20} color={color} />
              </div>

              <div className="notification-card-content">
                <div className="notification-card-title-row">
                  <h4 className="notification-title">{item.title}</h4>
                  {item.unread && <span className="notification-unread-dot" title="Unread"></span>}
                </div>
                <p className="notification-message">{item.message}</p>
                <div className="notification-meta-row">
                  <span className="notification-time">
                    <Clock size={12} /> {item.time}
                  </span>
                  <span className="notification-category-tag">{item.category}</span>
                </div>
              </div>
            </div>

            <div className="notification-card-right">
              {item.unread && (
                <button
                  type="button"
                  className="notification-item-read-btn"
                  title="Mark as read"
                  onClick={() => onMarkAsRead(item.id)}
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsList;
