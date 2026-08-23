import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import './OrderOverviewChart.css';

const datasets = {
  'This Week': [
    { label: '12 May', date: '12 May, 2026', value: 130, change: '+5.2%' },
    { label: '13 May', date: '13 May, 2026', value: 152, change: '+16.9%' },
    { label: '14 May', date: '14 May, 2026', value: 145, change: '-4.6%' },
    { label: '15 May', date: '15 May, 2026', value: 186, change: '+28.2%' },
    { label: '16 May', date: '16 May, 2026', value: 215, change: '+15.5%' },
    { label: '17 May', date: '17 May, 2026', value: 248, change: '+15.3%' },
    { label: '18 May', date: '18 May, 2026', value: 190, change: '-23.3%' },
  ],
  'This Month': [
    { label: 'Week 1', date: '1 - 7 May', value: 1120, change: '+8.4%' },
    { label: 'Week 2', date: '8 - 14 May', value: 1340, change: '+19.6%' },
    { label: 'Week 3', date: '15 - 21 May', value: 1580, change: '+17.9%' },
    { label: 'Week 4', date: '22 - 28 May', value: 1820, change: '+15.1%' },
  ],
  'This Year': [
    { label: 'Jan', date: 'Jan 2026', value: 3200, change: '+12.0%' },
    { label: 'Feb', date: 'Feb 2026', value: 3800, change: '+18.7%' },
    { label: 'Mar', date: 'Mar 2026', value: 4100, change: '+7.8%' },
    { label: 'Apr', date: 'Apr 2026', value: 4700, change: '+14.6%' },
    { label: 'May', date: 'May 2026', value: 5200, change: '+10.6%' },
    { label: 'Jun', date: 'Jun 2026', value: 5800, change: '+11.5%' },
    { label: 'Jul', date: 'Jul 2026', value: 6100, change: '+5.1%' },
    { label: 'Aug', date: 'Aug 2026', value: 6900, change: '+13.1%' },
    { label: 'Sep', date: 'Sep 2026', value: 7400, change: '+7.2%' },
    { label: 'Oct', date: 'Oct 2026', value: 8100, change: '+9.4%' },
    { label: 'Nov', date: 'Nov 2026', value: 8600, change: '+6.1%' },
    { label: 'Dec', date: 'Dec 2026', value: 9200, change: '+6.9%' },
  ]
};

const OrderOverviewChart = ({ hideHeader = false }) => {
  const [timeframe, setTimeframe] = useState('This Week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const currentData = datasets[timeframe] || datasets['This Week'];
  const activeIdx = hoverIndex !== null ? hoverIndex : Math.min(3, currentData.length - 1);
  const activeItem = currentData[activeIdx];

  const maxValue = Math.max(...currentData.map(d => d.value));
  const roundedMax = Math.ceil((maxValue * 1.15) / 50) * 50 || 200;

  const svgWidth = 500;
  const svgHeight = 200;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 30;

  const usableWidth = svgWidth - paddingLeft - paddingRight;
  const usableHeight = svgHeight - paddingTop - paddingBottom;

  const points = currentData.map((d, index) => {
    const x = paddingLeft + (index / (currentData.length - 1 || 1)) * usableWidth;
    const y = paddingTop + usableHeight - (d.value / roundedMax) * usableHeight;
    return { x, y, ...d };
  });

  const generateSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const mx = (curr.x + next.x) / 2;
      path += ` C ${mx} ${curr.y}, ${mx} ${next.y}, ${next.x} ${next.y}`;
    }
    return path;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + usableHeight} L ${points[0].x} ${paddingTop + usableHeight} Z`
    : '';

  const activePoint = points[activeIdx] || points[0];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    
    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((pt, idx) => {
      const diff = Math.abs(pt.x - mouseX);
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

  const yTicks = [
    { y: paddingTop, label: roundedMax.toLocaleString() },
    { y: paddingTop + usableHeight * 0.33, label: Math.round(roundedMax * 0.67).toLocaleString() },
    { y: paddingTop + usableHeight * 0.67, label: Math.round(roundedMax * 0.33).toLocaleString() },
    { y: paddingTop + usableHeight, label: '0' }
  ];

  const totalPeriodValue = currentData.reduce((acc, curr) => acc + curr.value, 0);

  const content = (
    <div className="chart-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg className="chart-svg-container" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="orderGradDynamic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.0" />
          </linearGradient>
        </defs>

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

        {/* Area under curve */}
        {areaPath && <path d={areaPath} fill="url(#orderGradDynamic)" />}

        {/* Smooth Bezier Line */}
        {linePath && (
          <path 
            d={linePath} 
            fill="none" 
            stroke="#16a34a" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
        )}

        {/* Vertical Crosshair Line */}
        {activePoint && (
          <line 
            x1={activePoint.x} 
            y1={paddingTop} 
            x2={activePoint.x} 
            y2={paddingTop + usableHeight} 
            stroke="#16a34a" 
            strokeDasharray="4 4" 
            strokeWidth="1.5" 
            opacity="0.6"
          />
        )}

        {/* Data Point Circles */}
        {points.map((pt, idx) => {
          const isActive = idx === activeIdx;
          return (
            <g key={idx}>
              {isActive && (
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r="9" 
                  fill="#16a34a" 
                  opacity="0.25"
                />
              )}
              <circle 
                cx={pt.x} 
                cy={pt.y} 
                r={isActive ? 6 : 4} 
                fill={isActive ? '#16a34a' : '#ffffff'} 
                stroke="#16a34a" 
                strokeWidth={isActive ? 2.5 : 2}
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
              />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {points.map((pt, idx) => {
          const isActive = idx === activeIdx;
          return (
            <text 
              key={idx} 
              x={pt.x} 
              y={svgHeight - 6} 
              textAnchor="middle" 
              className={`chart-axis-text ${isActive ? 'active' : ''}`}
              fontWeight={isActive ? '700' : '400'}
              fill={isActive ? '#16a34a' : 'var(--text-muted)'}
            >
              {pt.label}
            </text>
          );
        })}
      </svg>

      {/* Floating Interactive Tooltip Box */}
      {activePoint && activeItem && (
        <div 
          className="chart-tooltip-box"
          style={{
            top: `${Math.max(4, activePoint.y * (220 / svgHeight) - 52)}px`,
            left: `${(activePoint.x / svgWidth) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="chart-tooltip-header">
            <span className="chart-tooltip-val">{activeItem.value.toLocaleString()} Orders</span>
            <span className={`chart-tooltip-badge ${activeItem.change.startsWith('+') ? 'positive' : 'negative'}`}>
              {activeItem.change}
            </span>
          </div>
          <div className="chart-tooltip-date">{activeItem.date}</div>
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
          <h3 className="chart-title">Order Overview</h3>
          <div className="chart-sub-header">
            <span className="chart-metric-total">{totalPeriodValue.toLocaleString()}</span>
            <span className="chart-metric-label">total orders</span>
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
    </div>
  );
};

export default OrderOverviewChart;
