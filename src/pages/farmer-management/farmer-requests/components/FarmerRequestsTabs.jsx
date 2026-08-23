import React from 'react';
import './FarmerRequestsTabs.css';

/**
 * FarmerRequestsTabs Component
 * Segmented control tabs with colored count badges
 */
const FarmerRequestsTabs = ({
  activeTab = 'All Requests',
  onTabChange,
  counts = { all: 48, pending: 18, approved: 24, rejected: 6 }
}) => {
  const tabs = [
    { id: 'All Requests', label: 'All Requests', count: counts.all, badgeClass: 'badge-all' },
    { id: 'Pending', label: 'Pending', count: counts.pending, badgeClass: 'badge-pending' },
    { id: 'Approved', label: 'Approved', count: counts.approved, badgeClass: 'badge-approved' },
    { id: 'Rejected', label: 'Rejected', count: counts.rejected, badgeClass: 'badge-rejected' }
  ];

  return (
    <div className="farmer-requests-tabs-container">
      <div className="farmer-requests-tabs-list">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`farmer-requests-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange && onTabChange(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`tab-count-badge ${tab.badgeClass}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FarmerRequestsTabs;
