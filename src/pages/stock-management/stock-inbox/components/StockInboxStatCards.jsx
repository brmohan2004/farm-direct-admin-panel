import React from 'react';
import { Inbox, Clock, CheckCircle, XCircle } from 'lucide-react';
import './StockInboxStatCards.css';

/**
 * StockInboxStatCards Component
 * Renders the 4 summary stat cards (All, Pending, Approved, Rejected)
 * Act as interactive tab selectors for filtering stock requests
 */
const StockInboxStatCards = ({
  activeTab = 'All Requests',
  onTabChange,
  counts = { all: 24, pending: 12, approved: 8, rejected: 4 }
}) => {
  const cardsData = [
    {
      id: 'All Requests',
      shortLabel: 'All',
      label: 'All Requests',
      count: counts.all,
      icon: Inbox,
      colorClass: 'all'
    },
    {
      id: 'Pending',
      shortLabel: 'Pending',
      label: 'Pending',
      count: counts.pending,
      icon: Clock,
      colorClass: 'pending'
    },
    {
      id: 'Approved',
      shortLabel: 'Approved',
      label: 'Approved',
      count: counts.approved,
      icon: CheckCircle,
      colorClass: 'approved'
    },
    {
      id: 'Rejected',
      shortLabel: 'Rejected',
      label: 'Rejected',
      count: counts.rejected,
      icon: XCircle,
      colorClass: 'rejected'
    }
  ];

  return (
    <div className="stock-stat-cards-wrapper">
      <div className="stock-stat-cards-grid">
        {cardsData.map((card) => {
          const IconComponent = card.icon;
          const isActive = activeTab === card.id || (activeTab === 'All' && card.id === 'All Requests');

          return (
            <button
              key={card.id}
              type="button"
              className={`stock-stat-card stock-stat-card--${card.colorClass} ${isActive ? 'is-active' : ''}`}
              onClick={() => onTabChange && onTabChange(card.id)}
              aria-label={`Filter by ${card.label}`}
            >
              <div className={`stock-stat-icon-wrapper stock-stat-icon--${card.colorClass}`}>
                <IconComponent size={22} className="stock-stat-icon" />
              </div>
              <div className="stock-stat-info">
                <span className="stock-stat-count">{card.count}</span>
                <span className="stock-stat-label desktop-label">{card.label}</span>
                <span className="stock-stat-label mobile-label">{card.shortLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StockInboxStatCards;
