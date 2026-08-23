import React from 'react';
import { ShoppingCart, CheckCircle2, ChevronRight } from 'lucide-react';
import './FarmerSheetOrdersTab.css';

/**
 * FarmerSheetOrdersTab Component
 * Displays orders list inside farmer details sheet
 */
const FarmerSheetOrdersTab = () => {
  const orders = [
    { id: 'ORD-9821', date: '22 Aug 2026', items: '450 kg Tomatoes, 200 kg Carrots', amount: '₹28,450', status: 'Delivered' },
    { id: 'ORD-9754', date: '19 Aug 2026', items: '300 kg Spinach, 150 kg Beans', amount: '₹19,200', status: 'Delivered' },
    { id: 'ORD-9610', date: '15 Aug 2026', items: '500 kg Apples, 100 kg Bananas', amount: '₹34,800', status: 'Delivered' }
  ];

  return (
    <div className="farmer-sheet-orders-wrapper">
      <div className="orders-list">
        {orders.map((ord) => (
          <div key={ord.id} className="order-item-card">
            <div className="order-card-left">
              <div className="order-icon-box">
                <ShoppingCart size={16} />
              </div>
              <div className="order-info">
                <div className="order-title-row">
                  <span className="order-id">{ord.id}</span>
                  <span className="order-date">• {ord.date}</span>
                </div>
                <span className="order-items">{ord.items}</span>
              </div>
            </div>

            <div className="order-card-right">
              <span className="order-amount">{ord.amount}</span>
              <span className="order-status-tag">
                <CheckCircle2 size={10} /> {ord.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerSheetOrdersTab;
