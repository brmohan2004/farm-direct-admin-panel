import React from 'react';
import { Plus } from 'lucide-react';
import './ProductsHeader.css';

/**
 * ProductsHeader Component
 * Renders page title, subtitle, and top right "+ Add Stock" action button
 */
const ProductsHeader = ({
  title = 'Inventory',
  subtitle = 'Manage and track all available stock.',
  onAddStock
}) => {
  return (
    <div className="products-header">
      <div className="products-header-title-group">
        <h1 className="products-header-title">{title}</h1>
        <p className="products-header-subtitle">{subtitle}</p>
      </div>

      <button
        type="button"
        className="add-stock-btn"
        onClick={onAddStock}
        aria-label="Add Stock"
      >
        <Plus size={18} className="add-stock-icon" />
        <span>Add Stock</span>
      </button>
    </div>
  );
};

export default ProductsHeader;
