import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import './ConsumersFilterModal.css';

/**
 * ConsumersFilterModal Component
 * Filter popup for status, location, and spent range
 */
const ConsumersFilterModal = ({
  isOpen = false,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentFilters.status || 'all');
  const [selectedLocation, setSelectedLocation] = useState(currentFilters.location || 'all');

  if (!isOpen) return null;

  const handleReset = () => {
    setSelectedStatus('all');
    setSelectedLocation('all');
  };

  const handleApply = () => {
    onApplyFilters({
      status: selectedStatus,
      location: selectedLocation,
    });
    onClose();
  };

  return (
    <div className="consumers-filter-modal-overlay" onClick={onClose}>
      <div className="consumers-filter-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="consumers-filter-modal-header">
          <h3 className="consumers-filter-modal-title">Filter Consumers</h3>
          <button className="consumers-filter-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="consumers-filter-modal-body">
          {/* Status Filter */}
          <div className="consumers-filter-group">
            <label className="consumers-filter-group-title">Consumer Status</label>
            <div className="consumers-filter-options">
              {['all', 'Active', 'Inactive'].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`consumers-filter-chip ${selectedStatus === st ? 'consumers-filter-chip--active' : ''}`}
                  onClick={() => setSelectedStatus(st)}
                >
                  {st === 'all' ? 'All Statuses' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="consumers-filter-group">
            <label className="consumers-filter-group-title">Location</label>
            <div className="consumers-filter-options">
              {['all', 'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut'].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`consumers-filter-chip ${selectedLocation === loc ? 'consumers-filter-chip--active' : ''}`}
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc === 'all' ? 'All Locations' : loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="consumers-filter-modal-footer">
          <button className="consumers-filter-reset-btn" onClick={handleReset}>
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <div className="consumers-filter-footer-right">
            <button className="consumers-filter-btn consumers-filter-btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="consumers-filter-btn consumers-filter-btn--apply" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumersFilterModal;
