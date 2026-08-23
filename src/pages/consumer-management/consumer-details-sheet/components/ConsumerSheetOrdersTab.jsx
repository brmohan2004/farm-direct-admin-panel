import React from 'react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';

const ConsumerSheetOrdersTab = ({ consumer }) => {
  return (
    <div className="consumer-sheet-card">
      <h4 className="consumer-sheet-section-title">All Consumer Orders</h4>
      <div className="consumer-sheet-recent-orders" style={{ marginTop: '12px' }}>
        {(consumer?.recentOrders || []).map((ord) => (
          <div key={ord.id} className="sheet-recent-order-row">
            <OrderIconAvatar status={ord.status} size="sm" />
            <div className="sheet-order-meta">
              <span className="sheet-order-no">{ord.number}</span>
              <span className="sheet-order-date">{ord.date}</span>
            </div>
            <div className="sheet-order-right">
              <StatusBadge status={ord.status} size="sm" />
              <span className="sheet-order-amount">{ord.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerSheetOrdersTab;
