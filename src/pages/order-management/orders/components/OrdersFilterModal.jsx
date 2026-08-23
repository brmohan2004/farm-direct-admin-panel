import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import './OrdersFilterModal.css';

/**
 * OrdersFilterModal Component
 * Modal for filtering orders by status, payment method, date range, etc.
 */
const OrdersFilterModal = ({
  isOpen = false,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentFilters.status || 'all');
  const [selectedPayment, setSelectedPayment] = useState(currentFilters.payment || 'all');
  const [dateRange, setDateRange] = useState(currentFilters.dateRange || 'all');

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedStatus('all');
    setSelectedPayment('all');
    setDateRange('all');
  };

  const handleApply = () => {
    onApplyFilters({
      status: selectedStatus,
      payment: selectedPayment,
      dateRange,
    });
    onClose();
  };

  return (
    <div className="orders-filter-modal-overlay" onClick={onClose}>
      <div className="orders-filter-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="orders-filter-modal-header">
          <h3 className="orders-filter-modal-title">Filter Orders</h3>
          <button className="orders-filter-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="orders-filter-modal-body">
          {/* Order Status */}
          <div className="orders-filter-group">
            <label className="orders-filter-group-title">Order Status</label>
            <div className="orders-filter-options">
              {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`orders-filter-chip ${selectedStatus === st ? 'orders-filter-chip--active' : ''}`}
                  onClick={() => setSelectedStatus(st)}
                >
                  {st === 'all' ? 'All Statuses' : st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="orders-filter-group">
            <label className="orders-filter-group-title">Payment Method</label>
            <div className="orders-filter-options">
              {['all', 'COD', 'UPI', 'Card'].map((pm) => (
                <button
                  key={pm}
                  type="button"
                  className={`orders-filter-chip ${selectedPayment === pm ? 'orders-filter-chip--active' : ''}`}
                  onClick={() => setSelectedPayment(pm)}
                >
                  {pm === 'all' ? 'All Methods' : pm}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="orders-filter-group">
            <label className="orders-filter-group-title">Date Range</label>
            <div className="orders-filter-options">
              {[
                { key: 'all', label: 'All Time' },
                { key: 'today', label: 'Today' },
                { key: 'this_week', label: 'This Week' },
                { key: 'this_month', label: 'This Month' },
              ].map((dr) => (
                <button
                  key={dr.key}
                  type="button"
                  className={`orders-filter-chip ${dateRange === dr.key ? 'orders-filter-chip--active' : ''}`}
                  onClick={() => setDateRange(dr.key)}
                >
                  {dr.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="orders-filter-modal-footer">
          <button className="orders-filter-reset-btn" onClick={handleReset}>
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <div className="orders-filter-footer-right">
            <button className="orders-filter-btn orders-filter-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="orders-filter-btn orders-filter-btn--apply" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersFilterModal;
