import React from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import './OrdersFilterBar.css';

/**
 * OrdersFilterBar Component
 * Search bar and filter tabs for status selection with count badges
 */
const OrdersFilterBar = ({
  searchQuery = '',
  onSearchChange,
  activeTab = 'all',
  onTabChange,
  statusCounts = {
    all: 24,
    pending: 16,
    confirmed: 12,
    shipped: 10,
    delivered: 12,
    cancelled: 6,
  },
  onSort,
}) => {
  const tabs = [
    { key: 'all', label: 'All Orders', count: null },
    { key: 'pending', label: 'Pending', count: statusCounts.pending || 16, color: 'orange' },
    { key: 'confirmed', label: 'Confirmed', count: statusCounts.confirmed || 12, color: 'blue' },
    { key: 'shipped', label: 'Shipped', count: statusCounts.shipped || 10, color: 'lightblue' },
    { key: 'delivered', label: 'Delivered', count: statusCounts.delivered || 12, color: 'green' },
    { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled || 6, color: 'red' },
  ];

  return (
    <div className="orders-filter-bar">
      <div className="orders-filter-top">
        <div className="orders-search-input-wrapper">
          <Search size={18} className="orders-search-icon" />
          <input
            type="text"
            className="orders-search-input"
            placeholder="Search orders by order ID, customer name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Mobile sort button displayed next to search input on small screens */}
        <button
          className="orders-mobile-sort-btn"
          onClick={onSort}
          title="Sort orders"
        >
          <ArrowUpDown size={16} />
          <span>Sort</span>
        </button>
      </div>

      <div className="orders-tabs-wrapper">
        <div className="orders-tabs-scroll">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                className={`orders-tab-item ${isActive ? 'orders-tab-item--active' : ''}`}
                onClick={() => onTabChange(tab.key)}
              >
                <span className="orders-tab-label">{tab.label}</span>
                {tab.count !== null && (
                  <span className={`orders-tab-count orders-tab-count--${tab.color}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrdersFilterBar;
