import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchInput.css';

/**
 * SearchInput Component
 * Reusable search field with icon and clear button
 */
const SearchInput = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by name, phone or location...',
  className = ''
}) => {
  return (
    <div className={`search-input-wrapper ${className}`}>
      <Search size={18} className="search-input-icon" />
      <input
        type="text"
        className="search-input-field"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-input-clear"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
