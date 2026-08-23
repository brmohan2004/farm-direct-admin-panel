import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import SearchInput from '../../../../components/ui/SearchInput/SearchInput';
import DateRangePicker from '../../../../components/ui/DateRangePicker/DateRangePicker';
import './StockInboxFilterBar.css';

/**
 * StockInboxFilterBar Component
 * Search, filter modal trigger, and date range selector
 */
const StockInboxFilterBar = ({
  searchTerm = '',
  onSearchChange,
  onSearchClear,
  onOpenFilterModal,
  dateRange = '12 May - 18 May, 2024',
  onDateRangeChange,
  hasActiveFilters = false
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide when scrolling DOWN past 40px threshold, show when scrolling UP or at top
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="stock-filter-bar">
        <div className="stock-filter-bar-left">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            onClear={onSearchClear}
            placeholder="Search by farmer, product or request ID..."
            className="stock-search-input"
          />
        </div>

        <div className="stock-filter-bar-right">
          <button
            type="button"
            className={`stock-filter-btn ${hasActiveFilters ? 'has-active' : ''}`}
            onClick={onOpenFilterModal}
            aria-label="Open Filters"
          >
            <Filter size={16} className="stock-filter-icon" />
            <span>Filter</span>
            {hasActiveFilters && <span className="filter-active-dot" />}
          </button>

          <DateRangePicker
            value={dateRange}
            onChange={onDateRangeChange}
            className="stock-date-picker"
          />
        </div>
      </div>

      {/* Mobile Floating Circular Filter Action Button */}
      <button
        type="button"
        className={`stock-floating-filter-fab ${hasActiveFilters ? 'has-active' : ''} ${
          isVisible ? 'fab-visible' : 'fab-hidden'
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

export default StockInboxFilterBar;
