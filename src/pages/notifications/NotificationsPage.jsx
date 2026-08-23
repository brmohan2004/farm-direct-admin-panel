import React, { useState } from 'react';
import {
  NotificationsHeader,
  NotificationsFilter,
  NotificationsList
} from './components';

import './NotificationsPage.css';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'Order #ORD-8942 placed by Rajesh Kumar for ₹1,250 (5 items).',
    category: 'orders',
    time: '10 mins ago',
    unread: true
  },
  {
    id: 2,
    title: 'Farmer Registration Request',
    message: 'Ramesh Patel submitted documents for organic farm verification in Nashik.',
    category: 'farmers',
    time: '45 mins ago',
    unread: true
  },
  {
    id: 3,
    title: 'Low Stock Alert',
    message: 'Organic Tomatoes inventory is low (Only 12 kg remaining in central hub).',
    category: 'stock',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 4,
    title: 'Payment Settlement Complete',
    message: 'Weekly payout of ₹45,800 transferred to GreenValley Farmers Collective.',
    category: 'system',
    time: '5 hours ago',
    unread: false
  },
  {
    id: 5,
    title: 'Stock Harvest Uploaded',
    message: 'Suraj Singh added 150 kg fresh Alphonso Mangoes ready for pickup.',
    category: 'stock',
    time: '1 day ago',
    unread: false
  },
  {
    id: 6,
    title: 'Consumer Feedback Received',
    message: 'Ananya Sharma rated Order #ORD-8890 5-stars with high freshness score.',
    category: 'orders',
    time: '2 days ago',
    unread: false
  }
];

/**
 * NotificationsPage Component
 * Fully developed Notifications management interface
 */
const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(item => item.unread).length;

  const counts = {
    all: notifications.length,
    unread: unreadCount,
    orders: notifications.filter(i => i.category === 'orders').length,
    farmers: notifications.filter(i => i.category === 'farmers').length,
    stock: notifications.filter(i => i.category === 'stock').length,
    system: notifications.filter(i => i.category === 'system').length
  };

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'unread') return item.unread;
    if (activeTab !== 'all') return item.category === activeTab;
    return true;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="page-container notifications-page-container">
      <NotificationsHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
        onClearAll={handleClearAll}
      />

      <NotificationsFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      <NotificationsList
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationsPage;
