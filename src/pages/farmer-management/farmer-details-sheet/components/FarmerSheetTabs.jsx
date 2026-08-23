import React from 'react';
import { User, FileText, Landmark, Clock, ShoppingCart } from 'lucide-react';
import './FarmerSheetTabs.css';

/**
 * FarmerSheetTabs Component
 * Horizontal navigation tabs bar for the Farmer Details Sheet
 */
const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'documents', label: 'Documents', icon: FileText, badge: '5' },
  { id: 'bank', label: 'Bank Details', icon: Landmark },
  { id: 'activity', label: 'Activity Logs', icon: Clock },
  { id: 'orders', label: 'Orders', icon: ShoppingCart }
];

const FarmerSheetTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="farmer-sheet-tabs-container">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            className={`farmer-sheet-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={14} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`farmer-sheet-tab-badge ${isActive ? 'active' : ''}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FarmerSheetTabs;
