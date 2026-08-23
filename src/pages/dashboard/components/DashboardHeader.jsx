import React from 'react';
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
    </div>
  );
};

export default DashboardHeader;
