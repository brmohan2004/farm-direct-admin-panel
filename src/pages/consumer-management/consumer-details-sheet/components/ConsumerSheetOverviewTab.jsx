import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './ConsumerSheetOverviewTab.css';

const ConsumerSheetOverviewTab = ({ consumer, onNavigateTab }) => {
  if (!consumer) return null;

  return (
    <div className="consumer-sheet-tab-content">
      {/* Profile Information Card */}
      <div className="consumer-sheet-card">
        <h4 className="consumer-sheet-section-title">Profile Information</h4>
        <div className="consumer-sheet-fields">
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Full Name</span>
            <span className="sheet-field-val font-bold">{consumer.name}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Phone Number</span>
            <span className="sheet-field-val">{consumer.phone}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Email Address</span>
            <span className="sheet-field-val">{consumer.email}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Location</span>
            <span className="sheet-field-val">{consumer.location}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Status</span>
            <StatusBadge status={consumer.status} size="sm" />
          </div>
        </div>
      </div>

      {/* Order Summary Card */}
      <div className="consumer-sheet-card">
        <h4 className="consumer-sheet-section-title">Order Summary</h4>
        <div className="consumer-sheet-fields">
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Total Orders</span>
            <span className="sheet-field-val font-bold">{consumer.totalOrders}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Total Spent</span>
            <span className="sheet-field-val font-bold">{consumer.formattedTotalSpent}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Average Order Value</span>
            <span className="sheet-field-val">{consumer.avgOrderValue}</span>
          </div>
          <div className="sheet-field-row">
            <span className="sheet-field-lbl">Last Order Date</span>
            <span className="sheet-field-val">{consumer.lastOrderDate}</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Card */}
      <div className="consumer-sheet-card">
        <div className="consumer-sheet-card-header">
          <h4 className="consumer-sheet-section-title">Recent Orders</h4>
          <button className="consumer-sheet-link-btn" onClick={() => onNavigateTab && onNavigateTab('orders')}>
            View All
          </button>
        </div>

        <div className="consumer-sheet-recent-orders">
          {(consumer.recentOrders || []).slice(0, 3).map((ord) => (
            <div key={ord.id} className="sheet-recent-order-row">
              <OrderIconAvatar status={ord.status} size="sm" />
              <div className="sheet-order-meta">
                <span className="sheet-order-no">{ord.number}</span>
                <span className="sheet-order-date">{ord.date}</span>
                <StatusBadge status={ord.status} size="sm" />
              </div>
              <div className="sheet-order-right">
                <span className="sheet-order-amount">{ord.amount}</span>
                <ChevronRight size={16} className="sheet-chevron" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsumerSheetOverviewTab;
