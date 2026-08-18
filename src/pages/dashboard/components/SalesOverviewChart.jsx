import React from 'react';
import { ChevronDown } from 'lucide-react';
import './SalesOverviewChart.css';

const SalesOverviewChart = ({ hideHeader = false }) => {
  const content = (
    <div className="chart-wrapper">
      <svg className="chart-svg-container" viewBox="0 0 500 200" preserveAspectRatio="none">
        {/* Grid Lines */}
        <line x1="45" y1="20" x2="490" y2="20" className="chart-grid-line" />
        <text x="35" y="24" textAnchor="end" className="chart-axis-text">₹100K</text>

        <line x1="45" y1="52" x2="490" y2="52" className="chart-grid-line" />
        <text x="35" y="56" textAnchor="end" className="chart-axis-text">₹80K</text>

        <line x1="45" y1="84" x2="490" y2="84" className="chart-grid-line" />
        <text x="35" y="88" textAnchor="end" className="chart-axis-text">₹60K</text>

        <line x1="45" y1="116" x2="490" y2="116" className="chart-grid-line" />
        <text x="35" y="120" textAnchor="end" className="chart-axis-text">₹40K</text>

        <line x1="45" y1="148" x2="490" y2="148" className="chart-grid-line" />
        <text x="35" y="152" textAnchor="end" className="chart-axis-text">₹20K</text>

        <line x1="45" y1="180" x2="490" y2="180" stroke="var(--border-default)" strokeWidth="1" />
        <text x="35" y="184" textAnchor="end" className="chart-axis-text">₹0</text>

        {/* Bar Groups */}
        <rect x="68" y="140" width="16" height="40" rx="3" fill="#bbf7d0" />
        <rect x="68" y="155" width="16" height="25" rx="3" fill="#22c55e" className="sales-chart-bar" />

        <rect x="133" y="120" width="16" height="60" rx="3" fill="#bbf7d0" />
        <rect x="133" y="140" width="16" height="40" rx="3" fill="#22c55e" className="sales-chart-bar" />

        <rect x="198" y="90" width="16" height="90" rx="3" fill="#bbf7d0" />
        <rect x="198" y="125" width="16" height="55" rx="3" fill="#22c55e" className="sales-chart-bar" />

        <rect x="263" y="55" width="16" height="125" rx="3" fill="#bbf7d0" />
        <rect x="263" y="55" width="16" height="125" rx="3" fill="#16a34a" className="sales-chart-bar" />

        <rect x="328" y="100" width="16" height="80" rx="3" fill="#bbf7d0" />
        <rect x="328" y="130" width="16" height="50" rx="3" fill="#22c55e" className="sales-chart-bar" />

        <rect x="393" y="130" width="16" height="50" rx="3" fill="#bbf7d0" />
        <rect x="393" y="150" width="16" height="30" rx="3" fill="#22c55e" className="sales-chart-bar" />

        <rect x="458" y="110" width="16" height="70" rx="3" fill="#bbf7d0" />
        <rect x="458" y="135" width="16" height="45" rx="3" fill="#22c55e" className="sales-chart-bar" />

        {/* X Axis Labels */}
        <text x="76" y="196" textAnchor="middle" className="chart-axis-text">12 May</text>
        <text x="141" y="196" textAnchor="middle" className="chart-axis-text">13 May</text>
        <text x="206" y="196" textAnchor="middle" className="chart-axis-text">14 May</text>
        <text x="271" y="196" textAnchor="middle" className="chart-axis-text" fontWeight="700" fill="#16a34a">15 May</text>
        <text x="336" y="196" textAnchor="middle" className="chart-axis-text">16 May</text>
        <text x="401" y="196" textAnchor="middle" className="chart-axis-text">17 May</text>
        <text x="466" y="196" textAnchor="middle" className="chart-axis-text">18 May</text>
      </svg>

      {/* Floating Tooltip Box */}
      <div 
        className="chart-tooltip-box"
        style={{
          position: 'absolute',
          top: '16px',
          left: '54%',
          transform: 'translateX(-50%)'
        }}
      >
        <div className="chart-tooltip-val">₹78,650</div>
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
        <h3 className="chart-title">Sales Overview</h3>
        <button className="chart-dropdown">
          <span>This Week</span>
          <ChevronDown size={14} />
        </button>
      </div>
      {content}
    </div>
  );
};

export default SalesOverviewChart;
