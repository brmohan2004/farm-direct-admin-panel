import React from 'react';
import {
  DashboardHeader,
  StatCards,
  OrderOverviewChart,
  SalesOverviewChart,
  OrderStatusChart,
  MobileAnalyticsCard,
  MobileTablesCard,
  RecentOrders,
  RecentFarmerRequests,
  TopSellingProducts
} from './components';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="page-container">
      <DashboardHeader />
      
      {/* 4 Main Stat Cards */}
      <StatCards />

      {/* Desktop View Charts Grid */}
      <div className="dashboard-charts-grid">
        <OrderOverviewChart />
        <SalesOverviewChart />
        <OrderStatusChart />
      </div>

      {/* Mobile View Single Combined Analytics Card */}
      <div className="mobile-charts-block">
        <MobileAnalyticsCard />
      </div>

      {/* Desktop View Tables Grid: Recent Orders, Recent Farmer Requests, Top Selling Products */}
      <div className="dashboard-tables-grid">
        <RecentOrders />
        <RecentFarmerRequests />
        <TopSellingProducts />
      </div>

      {/* Mobile View Single Combined Activity / Tables Card */}
      <div className="mobile-tables-block">
        <MobileTablesCard />
      </div>
    </div>
  );
};

export default DashboardPage;
