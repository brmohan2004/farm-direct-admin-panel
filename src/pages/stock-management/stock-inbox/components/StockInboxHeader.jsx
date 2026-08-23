import React from 'react';
import './StockInboxHeader.css';

/**
 * StockInboxHeader Component
 * Displays the main page title and description
 */
const StockInboxHeader = ({ title = 'Stock Inbox', subtitle = 'Review and manage incoming stock from farmers.' }) => {
  return (
    <div className="stock-inbox-header">
      <div className="stock-inbox-header-title-group">
        <h1 className="stock-inbox-header-title">{title}</h1>
        <p className="stock-inbox-header-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default StockInboxHeader;
