import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import './ConsumersFilterBar.css';

/**
 * ConsumersFilterBar Component
 * Search input and action buttons (Filter, Export) for Consumers page
 */
const ConsumersFilterBar = ({
  searchQuery = '',
  onSearchChange,
  onOpenFilter,
  onExport,
}) => {
  return (
    <div className="consumers-filter-bar">
      <div className="consumers-search-input-wrapper">
        <Search size={18} className="consumers-search-icon" />
        <input
          type="text"
          className="consumers-search-input"
          placeholder="Search consumers by name, phone or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="consumers-filter-actions">
        <button
          className="consumers-bar-btn"
          onClick={onOpenFilter}
          title="Filter consumers"
        >
          <Filter size={16} />
          <span>Filter</span>
        </button>

        <button
          className="consumers-bar-btn"
          onClick={onExport}
          title="Export consumers list"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default ConsumersFilterBar;
