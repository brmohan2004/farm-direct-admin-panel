import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import './ProductsFilterModal.css';

/**
 * ProductsFilterModal Component
 * Filter dialog modal for products & stock levels
 */
const ProductsFilterModal = ({
  isOpen = false,
  onClose,
  currentFilters = { category: 'All', status: 'All', priceRange: 'All' },
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
    const initial = { category: 'All', status: 'All', priceRange: 'All' };
    setFilters(initial);
    if (onResetFilters) onResetFilters();
    onClose && onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Inventory"
      subtitle="Refine products by category, stock status, or price value"
      maxWidth="480px"
    >
      <div className="products-filter-modal-content">
        {/* Stock Status Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Stock Status</label>
          <div className="filter-pill-options">
            {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-pill ${filters.status === st ? 'active' : ''}`}
                onClick={() => handleChange('status', st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="filter-form-group">
          <label className="filter-form-label">Category</label>
          <select
            className="filter-form-select"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
            <option value="Pulses">Pulses</option>
            <option value="Millets">Millets</option>
            <option value="Dairy">Dairy</option>
            <option value="Spices">Spices</option>
            <option value="Oils">Oils</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        {/* Price Value Range */}
        <div className="filter-form-group">
          <label className="filter-form-label">Stock Value Filter</label>
          <select
            className="filter-form-select"
            value={filters.priceRange || 'All'}
            onChange={(e) => handleChange('priceRange', e.target.value)}
          >
            <option value="All">Any Total Value</option>
            <option value="under5000">Under ₹5,000</option>
            <option value="5000to10000">₹5,000 - ₹10,000</option>
            <option value="above10000">Above ₹10,000</option>
          </select>
        </div>

        {/* Modal Actions */}
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

export default ProductsFilterModal;
