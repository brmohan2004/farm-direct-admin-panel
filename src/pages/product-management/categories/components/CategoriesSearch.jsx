import React from 'react';
import { SearchInput } from '../../../../components/ui';
import './CategoriesSearch.css';

/**
 * CategoriesSearch Component
 * Search input container for filtering categories.
 */
const CategoriesSearch = ({ value, onChange, onClear }) => {
  return (
    <div className="categories-search-container">
      <SearchInput
        value={value}
        onChange={onChange}
        onClear={onClear}
        placeholder="Search categories..."
        className="categories-search-input"
      />
    </div>
  );
};

export default CategoriesSearch;
