import React from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import './SettingsHeader.css';

/**
 * SettingsHeader Component
 * Header section for the settings page with title, description, and optional quick search/filter
 */
const SettingsHeader = ({ title = 'Settings', subtitle = 'Manage consumer app settings and preferences.', searchQuery = '', onSearchChange }) => {
  return (
    <div className="settings-header">
      <div className="settings-header-text">
        <h1 className="settings-header-title">{title}</h1>
        <p className="settings-header-subtitle">{subtitle}</p>
      </div>

      {onSearchChange && (
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
      )}
    </div>
  );
};

export default SettingsHeader;
