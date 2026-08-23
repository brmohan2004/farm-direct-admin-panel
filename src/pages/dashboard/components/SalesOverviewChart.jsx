import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import './SalesOverviewChart.css';

const datasets = {
  'This Week': [
    { label: '12 May', date: '12 May, 2026', gross: 52000, net: 42500, orders: 130 },
    { label: '13 May', date: '13 May, 2026', gross: 68000, net: 56200, orders: 152 },
    { label: '14 May', date: '14 May, 2026', gross: 61000, net: 49800, orders: 145 },
    { label: '15 May', date: '15 May, 2026', gross: 92000, net: 78650, orders: 186 },
    { label: '16 May', date: '16 May, 2026', gross: 78000, net: 65400, orders: 215 },
    { label: '17 May', date: '17 May, 2026', gross: 98000, net: 84200, orders: 248 },
    { label: '18 May', date: '18 May, 2026', gross: 74000, net: 61200, orders: 190 },
  ],
  'This Month': [
    { label: 'Week 1', date: '1 - 7 May', gross: 420000, net: 358000, orders: 1120 },
    { label: 'Week 2', date: '8 - 14 May', gross: 510000, net: 432000, orders: 1340 },
    { label: 'Week 3', date: '15 - 21 May', gross: 620000, net: 524000, orders: 1580 },
    { label: 'Week 4', date: '22 - 28 May', gross: 710000, net: 605000, orders: 1820 },
  ],
  'This Year': [
    { label: 'Jan', date: 'Jan 2026', gross: 1200000, net: 1020000, orders: 3200 },
    { label: 'Feb', date: 'Feb 2026', gross: 1450000, net: 1240000, orders: 3800 },
    { label: 'Mar', date: 'Mar 2026', gross: 1600000, net: 1360000, orders: 4100 },
    { label: 'Apr', date: 'Apr 2026', gross: 1820000, net: 1540000, orders: 4700 },
    { label: 'May', date: 'May 2026', gross: 2050000, net: 1750000, orders: 5200 },
    { label: 'Jun', date: 'Jun 2026', gross: 2280000, net: 1940000, orders: 5800 },
    { label: 'Jul', date: 'Jul 2026', gross: 2400000, net: 2050000, orders: 6100 },
    { label: 'Aug', date: 'Aug 2026', gross: 2710000, net: 2310000, orders: 6900 },
    { label: 'Sep', date: 'Sep 2026', gross: 2900000, net: 2470000, orders: 7400 },
    { label: 'Oct', date: 'Oct 2026', gross: 3180000, net: 2710000, orders: 8100 },
    { label: 'Nov', date: 'Nov 2026', gross: 3390000, net: 2890000, orders: 8600 },
    { label: 'Dec', date: 'Dec 2026', gross: 3650000, net: 3120000, orders: 9200 },
  ]
};

const SalesOverviewChart = ({ hideHeader = false }) => {
  const [timeframe, setTimeframe] = useState('This Week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const currentData = datasets[timeframe] || datasets['This Week'];
  const activeIdx = hoverIndex !== null ? hoverIndex : Math.min(3, currentData.length - 1);
  const activeItem = currentData[activeIdx];

  const maxVal = Math.max(...currentData.map(d => d.gross));
  const roundedMax = Math.ceil((maxVal * 1.15) / 10000) * 10000 || 100000;

  const svgWidth = 500;
  const svgHeight = 200;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const usableWidth = svgWidth - paddingLeft - paddingRight;
  const usableHeight = svgHeight - paddingTop - paddingBottom;

  const barWidth = Math.max(12, Math.min(22, (usableWidth / currentData.length) * 0.45));

  const items = currentData.map((d, index) => {
    const groupX = paddingLeft + (index + 0.5) * (usableWidth / currentData.length);
    const grossHeight = (d.gross / roundedMax) * usableHeight;
    const netHeight = (d.net / roundedMax) * usableHeight;
    const grossY = paddingTop + usableHeight - grossHeight;
    const netY = paddingTop + usableHeight - netHeight;
    return {
      ...d,
      groupX,
      grossY,
      grossHeight,
      netY,
      netHeight
    };
  });

  const activeItemData = items[activeIdx] || items[0];

  const formatCurrency = (val) => {
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
    return `₹${val}`;
  };

  const yTicks = [
    { y: paddingTop, label: formatCurrency(roundedMax) },
    { y: paddingTop + usableHeight * 0.25, label: formatCurrency(roundedMax * 0.75) },
    { y: paddingTop + usableHeight * 0.5, label: formatCurrency(roundedMax * 0.5) },
    { y: paddingTop + usableHeight * 0.75, label: formatCurrency(roundedMax * 0.25) },
    { y: paddingTop + usableHeight, label: '₹0' }
  ];

  const totalPeriodRevenue = currentData.reduce((acc, curr) => acc + curr.net, 0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    
    let closestIndex = 0;
    let minDiff = Infinity;
    items.forEach((item, idx) => {
      const diff = Math.abs(item.groupX - mouseX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    setHoverIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const content = (
    <div className="chart-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg className="chart-svg-container" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
        {/* Grid lines & Y Axis Labels */}
        {yTicks.map((tick, idx) => (
          <g key={idx}>
            <line 
              x1={paddingLeft} 
              y1={tick.y} 
              x2={svgWidth - paddingRight} 
              y2={tick.y} 
              className={idx === yTicks.length - 1 ? "chart-axis-line" : "chart-grid-line"} 
            />
            <text x={paddingLeft - 8} y={tick.y + 4} textAnchor="end" className="chart-axis-text">
              {tick.label}
            </text>
          </g>
        ))}

        {/* Dual Bar Columns (Gross & Net Revenue) */}
        {items.map((item, idx) => {
          const isActive = idx === activeIdx;
          const isDimmed = hoverIndex !== null && !isActive;

          return (
            <g 
              key={idx} 
              className={`sales-bar-group ${isActive ? 'active' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {/* Gross Sales Bar (Background / Light Emerald) */}
              <rect
                x={item.groupX - barWidth / 2}
                y={item.grossY}
                width={barWidth}
                height={item.grossHeight}
                rx="4"
                fill="#bbf7d0"
                className={`sales-bar-column ${isDimmed ? 'dimmed' : ''}`}
              />

              {/* Net Sales Bar (Foreground / Dark Emerald) */}
              <rect
                x={item.groupX - barWidth / 2}
                y={item.netY}
                width={barWidth}
                height={item.netHeight}
                rx="4"
                fill={isActive ? '#15803d' : '#22c55e'}
                className={`sales-bar-column ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
              />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {items.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <text 
              key={idx} 
              x={item.groupX} 
              y={svgHeight - 6} 
              textAnchor="middle" 
              className={`chart-axis-text ${isActive ? 'active' : ''}`}
              fontWeight={isActive ? '700' : '400'}
              fill={isActive ? '#16a34a' : 'var(--text-muted)'}
            >
              {item.label}
            </text>
          );
        })}
      </svg>

      {/* Floating Tooltip Box */}
      {activeItemData && activeItem && (
        <div 
          className="chart-tooltip-box"
          style={{
            top: `${Math.max(4, activeItemData.netY * (220 / svgHeight) - 52)}px`,
            left: `${(activeItemData.groupX / svgWidth) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="chart-tooltip-header">
            <span className="chart-tooltip-val">₹{activeItem.net.toLocaleString()}</span>
            <span className="chart-tooltip-badge positive">Net Revenue</span>
          </div>
          <div className="chart-tooltip-date">
            {activeItem.date} • {activeItem.orders} Orders
          </div>
        </div>
      )}
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-title">Sales Overview</h3>
          <div className="chart-sub-header">
            <span className="chart-metric-total">₹{totalPeriodRevenue.toLocaleString()}</span>
            <span className="chart-metric-label">net revenue</span>
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
                    setHoverIndex(null);
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

      {/* Legend Footer */}
      <div className="chart-legend-row">
        <div className="chart-legend-item">
          <span className="chart-legend-swatch" style={{ backgroundColor: '#22c55e' }} />
          <span>Net Revenue</span>
        </div>
        <div className="chart-legend-item">
          <span className="chart-legend-swatch" style={{ backgroundColor: '#bbf7d0' }} />
          <span>Gross Sales</span>
        </div>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
