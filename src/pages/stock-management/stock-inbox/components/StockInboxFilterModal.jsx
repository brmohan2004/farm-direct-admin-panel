import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import './StockInboxFilterModal.css';

/**
 * StockInboxFilterModal Component
 * Filter options dialog overlay
 */
const StockInboxFilterModal = ({
  isOpen = false,
  onClose,
  currentFilters = { location: '', category: '', status: 'All', priceRange: 'All' },
  onApplyFilters,
  onResetFilters
}) => {
  const [filters, setFilters] = useState(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, isOpen]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    if (onApplyFilters) onApplyFilters(filters);
    onClose && onClose();
  };

  const handleReset = () => {
    const initial = { location: '', category: '', status: 'All', priceRange: 'All' };
    setFilters(initial);
    if (onResetFilters) onResetFilters();
    onClose && onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Stock Requests"
      subtitle="Refine incoming requests by category, location, status or price"
      maxWidth="480px"
    >
      <div className="filter-modal-content">
        {/* Status Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Status</label>
          <div className="filter-pill-options">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-pill ${filters.status === status ? 'active' : ''}`}
                onClick={() => handleChange('status', status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Product Category</label>
          <select
            className="filter-form-select"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Millets">Millets</option>
            <option value="Leafy Greens">Leafy Greens</option>
            <option value="Spices">Spices</option>
          </select>
        </div>

        {/* Location / District Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Location / District</label>
          <input
            type="text"
            className="filter-form-input"
            placeholder="e.g. Coimbatore, Salem, Erode"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        {/* Price Range Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Price per kg</label>
          <select
            className="filter-form-select"
            value={filters.priceRange || 'All'}
            onChange={(e) => handleChange('priceRange', e.target.value)}
          >
            <option value="All">Any Price</option>
            <option value="under25">Under ₹25 / kg</option>
            <option value="25to50">₹25 - ₹50 / kg</option>
            <option value="above50">Above ₹50 / kg</option>
          </select>
        </div>

        {/* Modal Action Buttons */}
        <div className="filter-modal-actions">
          <button type="button" className="filter-reset-btn" onClick={handleReset}>
            Reset All
          </button>
          <button type="button" className="filter-apply-btn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StockInboxFilterModal;
