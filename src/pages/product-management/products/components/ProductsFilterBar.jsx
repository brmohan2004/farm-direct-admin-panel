import React from 'react';
import { Filter } from 'lucide-react';
import SearchInput from '../../../../components/ui/SearchInput/SearchInput';
import CategorySelectDropdown from '../../../../components/ui/CategorySelectDropdown/CategorySelectDropdown';
import './ProductsFilterBar.css';

/**
 * ProductsFilterBar Component
 * Search input, filter modal trigger button, and Category select dropdown
 */
const ProductsFilterBar = ({
  searchTerm = '',
  onSearchChange,
  onSearchClear,
  onOpenFilterModal,
  selectedCategory = 'All Categories',
  onCategorySelectChange,
  hasActiveFilters = false
}) => {
  return (
    <div className="products-filter-bar">
      <div className="products-filter-bar-left">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          onClear={onSearchClear}
          placeholder="Search by product, category..."
          className="products-search-input"
        />
      </div>

      <div className="products-filter-bar-right">
        <button
          type="button"
          className={`products-filter-btn ${hasActiveFilters ? 'has-active' : ''}`}
          onClick={onOpenFilterModal}
          aria-label="Open Filters"
        >
          <Filter size={16} className="products-filter-icon" />
          <span>Filter</span>
          {hasActiveFilters && <span className="filter-active-dot" />}
        </button>

        <CategorySelectDropdown
          value={selectedCategory}
          onChange={onCategorySelectChange}
          className="products-category-dropdown"
        />
      </div>
    </div>
  );
};

export default ProductsFilterBar;
