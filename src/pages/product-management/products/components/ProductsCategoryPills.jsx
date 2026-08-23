import React from 'react';
import { ChevronRight } from 'lucide-react';
import './ProductsCategoryPills.css';

/**
 * ProductsCategoryPills Component
 * Horizontal row of category filter pills matching design screenshots
 */
const ProductsCategoryPills = ({
  activeCategory = 'All',
  onCategoryChange,
  categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Millets',
    'Dairy',
    'Spices',
    'Oils',
    'Beverages'
  ]
}) => {
  return (
    <div className="category-pills-wrapper">
      <div className="category-pills-scroll-container">
        {categories.map((cat) => {
          const isActive = activeCategory === cat || (activeCategory === 'All Categories' && cat === 'All');
          return (
            <button
              key={cat}
              type="button"
              className={`category-pill-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => onCategoryChange && onCategoryChange(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="category-pills-scroll-indicator">
        <ChevronRight size={16} className="scroll-chevron-icon" />
      </div>
    </div>
  );
};

export default ProductsCategoryPills;
