import React from 'react';
import { Filter, Calendar, ChevronDown } from 'lucide-react';
import SearchInput from '../../../../components/ui/SearchInput/SearchInput';
import './FarmerRequestsFilterBar.css';

/**
 * FarmerRequestsFilterBar Component
 * Renders search bar, filter popover button, and date range dropdown
 */
const FarmerRequestsFilterBar = ({
  searchTerm = '',
  onSearchChange,
  onSearchClear,
  onOpenFilterModal,
  dateRangeText = '12 May – 18 May, 2024',
  hasActiveFilters = false
}) => {
  return (
    <div className="farmer-requests-filter-bar">
      <div className="farmer-requests-search-wrapper">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          onClear={onSearchClear}
          placeholder="Search by name, phone or location..."
        />
      </div>

      <div className="filter-bar-right-actions">
        <button
          type="button"
          className={`filter-modal-trigger-btn ${hasActiveFilters ? 'has-active-filter' : ''}`}
          onClick={onOpenFilterModal}
        >
          <Filter size={16} />
          <span>Filter</span>
          {hasActiveFilters && <span className="active-filter-indicator"></span>}
        </button>

        <div className="date-range-picker-btn">
          <Calendar size={16} className="date-icon" />
          <span className="date-text">{dateRangeText}</span>
          <ChevronDown size={16} className="chevron-icon" />
        </div>
      </div>
    </div>
  );
};

export default FarmerRequestsFilterBar;
