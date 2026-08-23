import React from 'react';
import './ConsumerSheetTabs.css';

const ConsumerSheetTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['overview', 'orders', 'addresses', 'activity'];

  return (
    <div className="consumer-sheet-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`consumer-sheet-tab-btn ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ConsumerSheetTabs;
