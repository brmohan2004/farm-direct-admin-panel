import React from 'react';
import { ChevronDown } from 'lucide-react';
import './OrderOverviewChart.css';

const OrderOverviewChart = ({ hideHeader = false }) => {
  const content = (
    <div className="chart-wrapper">
      <svg className="chart-svg-container" viewBox="0 0 500 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines & Y Axis */}
        <line x1="40" y1="20" x2="490" y2="20" className="chart-grid-line" />
        <text x="30" y="24" textAnchor="end" className="chart-axis-text">200</text>

        <line x1="40" y1="60" x2="490" y2="60" className="chart-grid-line" />
        <text x="30" y="64" textAnchor="end" className="chart-axis-text">150</text>

        <line x1="40" y1="100" x2="490" y2="100" className="chart-grid-line" />
        <text x="30" y="104" textAnchor="end" className="chart-axis-text">100</text>

        <line x1="40" y1="140" x2="490" y2="140" className="chart-grid-line" />
        <text x="30" y="144" textAnchor="end" className="chart-axis-text">50</text>

        <line x1="40" y1="180" x2="490" y2="180" stroke="var(--border-default)" strokeWidth="1" />
        <text x="30" y="184" textAnchor="end" className="chart-axis-text">0</text>

        {/* Area under curve */}
        <polygon 
          points="60,150 130,110 205,130 280,35 355,100 425,160 480,90 480,180 60,180" 
          fill="url(#orderGrad)" 
        />

        {/* Smooth Curve */}
        <path 
          d="M 60 150 Q 95 110 130 110 T 205 130 T 280 35 T 355 100 T 425 160 T 480 90" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />

        {/* Active indicator line on 15 May */}
        <line x1="280" y1="35" x2="280" y2="180" stroke="#94a3b8" strokeDasharray="3 3" strokeWidth="1.5" />

        {/* Data Points */}
        <circle cx="60" cy="150" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <circle cx="130" cy="110" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <circle cx="205" cy="130" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        {/* Active Highlighted Node */}
        <circle cx="280" cy="35" r="6" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
        <circle cx="355" cy="100" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <circle cx="425" cy="160" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <circle cx="480" cy="90" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />

        {/* X Axis Labels */}
        <text x="60" y="196" textAnchor="middle" className="chart-axis-text">12 May</text>
        <text x="130" y="196" textAnchor="middle" className="chart-axis-text">13 May</text>
        <text x="205" y="196" textAnchor="middle" className="chart-axis-text">14 May</text>
        <text x="280" y="196" textAnchor="middle" className="chart-axis-text" fontWeight="700" fill="#16a34a">15 May</text>
        <text x="355" y="196" textAnchor="middle" className="chart-axis-text">16 May</text>
        <text x="425" y="196" textAnchor="middle" className="chart-axis-text">17 May</text>
        <text x="480" y="196" textAnchor="middle" className="chart-axis-text">18 May</text>
      </svg>

      {/* Floating Tooltip Pill */}
      <div 
        className="chart-tooltip-box"
        style={{
          position: 'absolute',
          top: '8px',
          left: '52%',
          transform: 'translateX(-50%)'
        }}
      >
        <div className="chart-tooltip-val">186 Orders</div>
        <div className="chart-tooltip-date">15 May, 2024</div>
      </div>
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-title">Order Overview</h3>
        <button className="chart-dropdown">
          <span>This Week</span>
          <ChevronDown size={14} />
        </button>
      </div>
      {content}
    </div>
  );
};

export default OrderOverviewChart;
