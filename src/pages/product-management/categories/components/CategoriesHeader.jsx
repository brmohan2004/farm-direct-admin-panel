import React from 'react';
import { Plus } from 'lucide-react';
import './CategoriesHeader.css';

/**
 * CategoriesHeader Component
 * Displays the page title, subtitle, and primary "+ Add Category" button.
 */
const CategoriesHeader = ({ onAddCategory }) => {
  return (
    <div className="categories-header">
      <div className="categories-header-info">
        <h1 className="categories-header-title">Categories</h1>
        <p className="categories-header-subtitle">Manage product categories.</p>
      </div>

      <button
        type="button"
        className="categories-add-btn"
        onClick={onAddCategory}
        aria-label="Add Category"
      >
        <Plus size={18} />
        <span>Add Category</span>
      </button>
    </div>
  );
};

export default CategoriesHeader;
