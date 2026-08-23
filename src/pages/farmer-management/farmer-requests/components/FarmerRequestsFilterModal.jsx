import React, { useState } from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import './FarmerRequestsFilterModal.css';

/**
 * FarmerRequestsFilterModal Component
 * Modal to select locations, crop types, date range, and statuses
 */
const FarmerRequestsFilterModal = ({
  isOpen = false,
  onClose,
  onApplyFilters,
  onResetFilters,
  currentFilters = {}
}) => {
  const [selectedLocation, setSelectedLocation] = useState(currentFilters.location || '');
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
  const [selectedStatus, setSelectedStatus] = useState(currentFilters.status || 'All');

  const handleApply = () => {
    onApplyFilters({
      location: selectedLocation,
      category: selectedCategory,
      status: selectedStatus
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedLocation('');
    setSelectedCategory('');
    setSelectedStatus('All');
    onResetFilters();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Farmer Requests"
      subtitle="Refine requests by district, product category, or status"
      maxWidth="480px"
    >
      <div className="filter-modal-content">
        {/* District / Location Filter */}
        <div className="filter-group">
          <label className="filter-label">Location / District</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            <option value="">All Locations</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Erode">Erode</option>
            <option value="Tirupur">Tirupur</option>
            <option value="Salem">Salem</option>
            <option value="Dindigul">Dindigul</option>
            <option value="Madurai">Madurai</option>
            <option value="Thanjavur">Thanjavur</option>
          </select>
        </div>

        {/* Product Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Product Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Leafy Greens">Leafy Greens</option>
            <option value="Millets">Millets</option>
            <option value="Pulses">Pulses</option>
            <option value="Rice">Rice</option>
            <option value="Spices">Spices</option>
          </select>
        </div>

        {/* Status Radio options */}
        <div className="filter-group">
          <label className="filter-label">Registration Status</label>
          <div className="filter-radio-grid">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <label key={status} className="radio-pill-label">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={selectedStatus === status}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-pill-text">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="filter-modal-actions">
          <button type="button" className="btn-filter-reset" onClick={handleReset}>
            Reset Filters
          </button>
          <button type="button" className="btn-filter-apply" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FarmerRequestsFilterModal;
