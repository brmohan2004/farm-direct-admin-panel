import React from 'react';
import './OrderStatusChart.css';

const statusData = [
  { label: 'Delivered', count: 642, percent: '51.4%', color: '#22c55e', strokeDash: '161 314', strokeOffset: '0' },
  { label: 'Processing', count: 312, percent: '25.0%', color: '#f59e0b', strokeDash: '78 314', strokeOffset: '-161' },
  { label: 'Shipped', count: 198, percent: '15.9%', color: '#3b82f6', strokeDash: '50 314', strokeOffset: '-239' },
  { label: 'Cancelled', count: 96, percent: '7.7%', color: '#ef4444', strokeDash: '25 314', strokeOffset: '-289' },
];

const OrderStatusChart = ({ hideHeader = false }) => {
  const content = (
    <div className="donut-content-wrapper">
      <div className="donut-svg-box">
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-subtle)" strokeWidth="14" />

          {/* Delivered (51.4%) */}
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="#22c55e"
            strokeWidth="14"
            strokeDasharray="161 314"
            strokeDashoffset="0"
            transform="rotate(-90 60 60)"
          />
          {/* Processing (25.0%) */}
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="14"
            strokeDasharray="78 314"
            strokeDashoffset="-161"
            transform="rotate(-90 60 60)"
          />
          {/* Shipped (15.9%) */}
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="14"
            strokeDasharray="50 314"
            strokeDashoffset="-239"
            transform="rotate(-90 60 60)"
          />
          {/* Cancelled (7.7%) */}
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="#ef4444"
            strokeWidth="14"
            strokeDasharray="25 314"
            strokeDashoffset="-289"
            transform="rotate(-90 60 60)"
          />
        </svg>

        <div className="donut-center-text">
          <span className="donut-total-num">1,248</span>
          <span className="donut-total-label">Total</span>
        </div>
      </div>

      <div className="status-legend-list">
        {statusData.map((item) => (
          <div key={item.label} className="legend-item">
            <div className="legend-left">
              <span className="legend-dot" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
            <div className="legend-right">
              <span>{item.count}</span>
              <span className="legend-percent">({item.percent})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-title">Order Status</h3>
      </div>
      {content}
    </div>
  );
};

export default OrderStatusChart;
