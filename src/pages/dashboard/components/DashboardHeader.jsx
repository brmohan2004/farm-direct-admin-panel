import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import './DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <div className="dashboard-header-root">
      <div className="greeting-title-wrap">
        <h1 className="greeting-h1">
          Welcome back, Admin! 👋
        </h1>
        <p className="greeting-sub">
          Here's what's happening with your store today.
        </p>
      </div>

      <button className="date-filter-btn" aria-label="Select date range">
        <Calendar className="calendar-icon" />
        <span>12 May - 18 May, 2024</span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
};

export default DashboardHeader;
