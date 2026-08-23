import React from 'react';
import './FarmerDetailsTabs.css';

/**
 * FarmerDetailsTabs Component
 * Renders tab navigation bar matching the design screenshots
 */
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'documents', label: 'Documents' },
  { id: 'bank', label: 'Bank Details' },
  { id: 'activity', label: 'Activity' },
  { id: 'orders', label: 'Orders' },
  { id: 'reviews', label: 'Reviews' }
];

const FarmerDetailsTabs = ({ activeTab = 'overview', onTabChange }) => {
  return (
    <div className="farmer-details-tabs-container">
      <div className="farmer-details-tabs-list" role="tablist">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`details-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange(tab.id)}
            >
              {tab.label}
              {isActive && <span className="active-tab-line"></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerDetailsTabs;
