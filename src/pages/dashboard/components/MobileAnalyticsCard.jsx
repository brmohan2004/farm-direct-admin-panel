import React, { useState } from 'react';
import { TrendingUp, BarChart2, PieChart, ChevronDown, Calendar } from 'lucide-react';
import OrderOverviewChart from './OrderOverviewChart';
import SalesOverviewChart from './SalesOverviewChart';
import OrderStatusChart from './OrderStatusChart';
import './MobileAnalyticsCard.css';

const MobileAnalyticsCard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'sales' | 'status'

  const titles = {
    orders: 'Order Overview',
    sales: 'Sales Overview',
    status: 'Order Status'
  };

  return (
    <div className="mobile-card-row">
      <div className="mobile-analytics-card">
        <div className="mobile-chart-body" style={{ marginTop: '8px' }}>
          {activeTab === 'orders' && <OrderOverviewChart />}
          {activeTab === 'sales' && <SalesOverviewChart />}
          {activeTab === 'status' && <OrderStatusChart />}
        </div>
      </div>

      {/* Outside Vertical Icon Buttons Toolbar on Right */}
      <div className="analytics-vertical-tab-group">
        <button
          className={`tab-icon-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
          title="Order Overview"
          aria-label="Order Overview"
        >
          <TrendingUp size={19} />
        </button>

        <button
          className={`tab-icon-btn ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
          title="Sales Overview"
          aria-label="Sales Overview"
        >
          <BarChart2 size={19} />
        </button>

        <button
          className={`tab-icon-btn ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
          title="Order Status"
          aria-label="Order Status"
        >
          <PieChart size={19} />
        </button>
      </div>
    </div>
  );
};

export default MobileAnalyticsCard;
