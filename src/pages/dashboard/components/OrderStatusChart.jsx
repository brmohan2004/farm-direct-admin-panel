import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import './OrderStatusChart.css';

const datasets = {
  'This Week': [
    { label: 'Delivered', count: 642, color: '#22c55e' },
    { label: 'Processing', count: 312, color: '#f59e0b' },
    { label: 'Shipped', count: 198, color: '#2563eb' },
    { label: 'Cancelled', count: 96, color: '#ef4444' },
  ],
  'This Month': [
    { label: 'Delivered', count: 3120, color: '#22c55e' },
    { label: 'Processing', count: 1450, color: '#f59e0b' },
    { label: 'Shipped', count: 890, color: '#2563eb' },
    { label: 'Cancelled', count: 400, color: '#ef4444' },
  ],
  'This Year': [
    { label: 'Delivered', count: 38400, color: '#22c55e' },
    { label: 'Processing', count: 16200, color: '#f59e0b' },
    { label: 'Shipped', count: 11500, color: '#2563eb' },
    { label: 'Cancelled', count: 4800, color: '#ef4444' },
  ]
};

const OrderStatusChart = ({ hideHeader = false }) => {
  const [timeframe, setTimeframe] = useState('This Week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredStatus, setHoveredStatus] = useState(null);

  const statusData = datasets[timeframe] || datasets['This Week'];
  const totalCount = statusData.reduce((acc, curr) => acc + curr.count, 0);

  // SVG Circumference for radius r=50 (2 * PI * 50 = 314.159)
  const circumference = 314.159;

  // Calculate DashOffset & percentages for each slice
  let cumulativePercent = 0;
  const processedSlices = statusData.map((item) => {
    const percentVal = (item.count / totalCount) * 100;
    const dashLength = (percentVal / 100) * circumference;
    const dashOffset = -(cumulativePercent / 100) * circumference;
    cumulativePercent += percentVal;

    return {
      ...item,
      percentStr: `${percentVal.toFixed(1)}%`,
      dashLength,
      dashOffset
    };
  });

  const activeSlice = hoveredStatus ? processedSlices.find(s => s.label === hoveredStatus) : null;

  const content = (
    <div className="donut-content-wrapper">
      <div className="donut-svg-box">
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-subtle)" strokeWidth="14" />

          {processedSlices.map((slice) => {
            const isHovered = hoveredStatus === slice.label;
            const isDimmed = hoveredStatus && !isHovered;

            return (
              <circle
                key={slice.label}
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={slice.color}
                strokeWidth={isHovered ? 17 : 14}
                strokeDasharray={`${slice.dashLength} ${circumference - slice.dashLength}`}
                strokeDashoffset={slice.dashOffset}
                transform="rotate(-90 60 60)"
                className={`donut-segment ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredStatus(slice.label)}
                onMouseLeave={() => setHoveredStatus(null)}
              />
            );
          })}
        </svg>

        <div className="donut-center-text">
          <span className="donut-total-num">
            {activeSlice ? activeSlice.count.toLocaleString() : totalCount.toLocaleString()}
          </span>
          <span className="donut-total-label">
            {activeSlice ? activeSlice.label : 'Total'}
          </span>
        </div>
      </div>

      <div className="status-legend-list">
        {processedSlices.map((item) => {
          const isActive = hoveredStatus === item.label;
          return (
            <div 
              key={item.label} 
              className={`legend-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setHoveredStatus(item.label)}
              onMouseLeave={() => setHoveredStatus(null)}
            >
              <div className="legend-left">
                <span className="legend-dot" style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
              <div className="legend-right">
                <span>{item.count.toLocaleString()}</span>
                <span className="legend-percent">({item.percentStr})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Order Status</h3>
          <div className="chart-sub-header">
            <span className="chart-metric-total">{totalCount.toLocaleString()}</span>
            <span className="chart-metric-label">total items</span>
          </div>
        </div>

        <div className="chart-dropdown-wrapper">
          <button 
            className="chart-dropdown" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Calendar size={13} />
            <span>{timeframe}</span>
            <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="chart-dropdown-menu">
              {Object.keys(datasets).map((tf) => (
                <button 
                  key={tf} 
                  className={`dropdown-menu-item ${tf === timeframe ? 'active' : ''}`}
                  onClick={() => {
                    setTimeframe(tf);
                    setDropdownOpen(false);
                    setHoveredStatus(null);
                  }}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {content}
    </div>
  );
};

export default OrderStatusChart;
