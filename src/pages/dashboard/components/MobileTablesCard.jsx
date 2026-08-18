import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, UserPlus, Package, ChevronRight } from 'lucide-react';
import RecentOrders from './RecentOrders';
import RecentFarmerRequests from './RecentFarmerRequests';
import TopSellingProducts from './TopSellingProducts';
import './MobileTablesCard.css';

const MobileTablesCard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'requests' | 'products'

  const tabConfig = {
    orders: {
      title: 'Recent Orders',
      count: 56,
      link: '/order-management/orders'
    },
    requests: {
      title: 'Recent Farmer Requests',
      count: 18,
      link: '/farmer-management/requests'
    },
    products: {
      title: 'Top Selling Products',
      count: 5,
      link: '/product-management/products'
    }
  };

  const current = tabConfig[activeTab];

  return (
    <div className="mobile-card-row">
      <div className="mobile-tables-card">
        <div className="mobile-tables-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 className="mobile-tables-title">{current.title}</h3>
            <span className="card-header-badge">{current.count}</span>
          </div>

          <NavLink to={current.link} className="view-all-link">
            View All <ChevronRight size={15} />
          </NavLink>
        </div>

        <div className="mobile-chart-body">
          {activeTab === 'orders' && <RecentOrders hideHeader />}
          {activeTab === 'requests' && <RecentFarmerRequests hideHeader />}
          {activeTab === 'products' && <TopSellingProducts hideHeader />}
        </div>
      </div>

      {/* Outside Vertical Icon Buttons Toolbar on Right */}
      <div className="analytics-vertical-tab-group">
        <button
          className={`tab-icon-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
          title="Recent Orders (56)"
          aria-label="Recent Orders"
        >
          <div className="tab-icon-badge-wrap">
            <ShoppingBag size={19} />
            <span className="tab-icon-badge">56</span>
          </div>
        </button>

        <button
          className={`tab-icon-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
          title="Recent Farmer Requests (18)"
          aria-label="Recent Farmer Requests"
        >
          <div className="tab-icon-badge-wrap">
            <UserPlus size={19} />
            <span className="tab-icon-badge">18</span>
          </div>
        </button>

        <button
          className={`tab-icon-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
          title="Top Selling Products (5)"
          aria-label="Top Selling Products"
        >
          <div className="tab-icon-badge-wrap">
            <Package size={19} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileTablesCard;
