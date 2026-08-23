import React from 'react';
import { Download, ArrowUpDown, Filter } from 'lucide-react';
import './OrdersHeader.css';

/**
 * OrdersHeader Component
 * Displays page title, description and top action controls (Export, Sort, Filter)
 */
const OrdersHeader = ({
  onExport,
  onSort,
  onOpenFilter,
  sortDirection = 'desc',
}) => {
  return (
    <div className="orders-header">
      <div className="orders-header-text">
        <h1 className="orders-title">Orders</h1>
        <p className="orders-subtitle">Manage customer orders and track their status.</p>
      </div>

      <div className="orders-header-actions">
        <button
          className="orders-action-btn orders-action-btn--secondary"
          onClick={onExport}
          title="Export orders data"
        >
          <Download size={16} />
          <span>Export</span>
        </button>

        <button
          className="orders-action-btn orders-action-btn--secondary"
          onClick={onSort}
          title="Sort orders list"
        >
          <ArrowUpDown size={16} />
          <span>Sort</span>
        </button>

        <button
          className="orders-action-btn orders-action-btn--primary"
          onClick={onOpenFilter}
          title="Filter orders"
        >
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;
