import React from 'react';
import './NotificationsFilter.css';

/**
 * NotificationsFilter Component
 * Category filter tabs (All, Orders, Farmers, Stock, System)
 */
const NotificationsFilter = ({ activeTab = 'all', onTabChange, counts = {} }) => {
  const tabs = [
    { id: 'all', label: 'All Notifications', count: counts.all || 0 },
    { id: 'unread', label: 'Unread', count: counts.unread || 0 },
    { id: 'orders', label: 'Orders', count: counts.orders || 0 },
    { id: 'farmers', label: 'Farmers', count: counts.farmers || 0 },
    { id: 'stock', label: 'Stock Alerts', count: counts.stock || 0 },
    { id: 'system', label: 'System', count: counts.system || 0 }
  ];

  return (
    <div className="notifications-filter-wrapper">
      <div className="notifications-filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`notifications-tab-btn ${activeTab === tab.id ? 'notifications-tab-btn--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className={`notifications-tab-count ${activeTab === tab.id ? 'notifications-tab-count--active' : ''}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationsFilter;
