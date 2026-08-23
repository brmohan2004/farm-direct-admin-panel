import React, { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';
import SearchInput from '../../../../components/ui/SearchInput/SearchInput';
import './FarmerRequestsFilterBar.css';

/**
 * FarmerRequestsFilterBar Component
 * Search bar and Export button in same row + Mobile floating filter button above nav bar
 */
const FarmerRequestsFilterBar = ({
  searchTerm = '',
  onSearchChange,
  onSearchClear,
  onOpenFilterModal,
  onExport,
  hasActiveFilters = false
}) => {
  const [isFabVisible, setIsFabVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide when scrolling DOWN past 40px, show when scrolling UP or at top
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsFabVisible(false);
      } else {
        setIsFabVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
          {/* Filter button for desktop/tablet view */}
          <button
            type="button"
            className={`filter-modal-trigger-btn ${hasActiveFilters ? 'has-active-filter' : ''}`}
            onClick={onOpenFilterModal}
            aria-label="Open Filters"
          >
            <Filter size={16} />
            <span>Filter</span>
            {hasActiveFilters && <span className="active-filter-indicator"></span>}
          </button>

          {/* Export button in the same row */}
          <button
            type="button"
            className="farmer-requests-export-btn"
            onClick={onExport}
            aria-label="Export Data"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Mobile Floating Circular Filter FAB Button (above bottom nav bar right side) */}
      <button
        type="button"
        className={`farmer-floating-filter-fab ${hasActiveFilters ? 'has-active' : ''} ${
          isFabVisible ? 'fab-visible' : 'fab-hidden'
        }`}
        onClick={onOpenFilterModal}
        aria-label="Open Floating Filters"
      >
        <Filter size={20} className="floating-filter-icon" />
        {hasActiveFilters && <span className="floating-filter-badge" />}
      </button>
    </>
  );
};

export default FarmerRequestsFilterBar;

