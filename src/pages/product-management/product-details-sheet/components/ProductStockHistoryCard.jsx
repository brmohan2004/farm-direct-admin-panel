import React from 'react';
import { Clock, Plus, Minus } from 'lucide-react';
import './ProductStockHistoryCard.css';

const DEFAULT_HISTORY = [
  {
    id: 'h-1',
    type: 'added',
    title: 'Stock Added',
    timestamp: '12 May 2024, 10:20 AM',
    change: '+100 kg',
    user: 'By Admin'
  },
  {
    id: 'h-2',
    type: 'used',
    title: 'Stock Used',
    timestamp: '11 May 2024, 04:15 PM',
    change: '-20 kg',
    user: 'By Admin'
  },
  {
    id: 'h-3',
    type: 'added',
    title: 'Stock Added',
    timestamp: '10 May 2024, 11:30 AM',
    change: '+170 kg',
    user: 'By Admin'
  }
];

const ProductStockHistoryCard = ({ history = DEFAULT_HISTORY, onViewAll }) => {
  return (
    <div className="product-stock-history-card">
      <div className="card-section-header header-with-action">
        <div className="header-left-title">
          <Clock size={18} className="header-icon-green" />
          <h3 className="section-title-text">Stock History</h3>
        </div>

        <button
          type="button"
          className="history-view-all-btn"
          onClick={onViewAll}
        >
          View All
        </button>
      </div>

      <div className="history-timeline-list">
        {history.map((item) => {
          const isAdded = item.type === 'added';
          return (
            <div key={item.id} className="history-timeline-item">
              <div className={`history-icon-circle ${isAdded ? 'circle-added' : 'circle-used'}`}>
                {isAdded ? <Plus size={16} /> : <Minus size={16} />}
              </div>

              <div className="history-item-details">
                <span className="history-item-title">{item.title}</span>
                <span className="history-item-time">{item.timestamp}</span>
              </div>

              <div className="history-item-right">
                <span className={`history-change-val ${isAdded ? 'val-green' : 'val-red'}`}>
                  {item.change}
                </span>
                <span className="history-user-tag">{item.user}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductStockHistoryCard;
