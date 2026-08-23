import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import './TransactionsFilterBar.css';

/**
 * TransactionsFilterBar Component
 * Search and filter controls for Payments & Payouts
 */
const TransactionsFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  activeTab
}) => {
  const statusOptions = activeTab === 'payments' 
    ? ['All', 'Successful', 'Pending', 'Failed']
    : ['All', 'Successful', 'Processing', 'Failed'];

  return (
    <div className="trans-filter-bar-root">
      {/* Search Input Box */}
      <div className="trans-search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder={activeTab === 'payments' ? "Search by Order ID, TXN ID, Customer..." : "Search by Payout ID, Farmer Name, Bank..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="trans-search-input"
        />
        {searchQuery && (
          <button
            type="button"
            className="trans-search-clear"
            onClick={() => onSearchChange('')}
          >
            &times;
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="trans-filter-controls">
        {/* Status Pills */}
        <div className="trans-status-pills">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              className={`status-pill ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Date Filter Dropdown */}
        <div className="trans-date-filter">
          <Calendar size={14} className="date-icon" />
          <select className="trans-select-input">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionsFilterBar;
