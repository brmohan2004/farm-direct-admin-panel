import React from 'react';
import { Search } from 'lucide-react';
import './SettingsHeader.css';

/**
 * SettingsHeader Component
 * Search and filter control bar for Settings page
 */
const SettingsHeader = ({
  searchQuery = '',
  onSearchChange
}) => {
  if (!onSearchChange) return null;

  return (
    <div className="settings-header">
      <div className="settings-header-actions">
        <div className="settings-search-wrapper">
          <Search className="settings-search-icon" size={16} />
          <input
            type="text"
            className="settings-search-input"
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;
