import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import './DateRangePicker.css';

/**
 * DateRangePicker Component
 * Global reusable date range selector matching admin panel styling
 */
const DateRangePicker = ({
  value = '12 May - 18 May, 2024',
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(value);
  const dropdownRef = useRef(null);

  const presets = [
    'Today',
    'Yesterday',
    'This Week (12 May - 18 May, 2024)',
    'Last 7 Days',
    'This Month (May 2024)',
    'Last Month (April 2024)',
    'Custom Range...'
  ];

  const handleSelect = (preset) => {
    let text = preset;
    if (preset.includes('12 May - 18 May, 2024')) {
      text = '12 May - 18 May, 2024';
    } else if (preset === 'Today') {
      text = '18 May, 2024';
    } else if (preset === 'Yesterday') {
      text = '17 May, 2024';
    } else if (preset === 'Last 7 Days') {
      text = '11 May - 18 May, 2024';
    } else if (preset.includes('This Month')) {
      text = '01 May - 31 May, 2024';
    }
    setSelectedRange(text);
    if (onChange) onChange(text);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`date-range-picker-container ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`date-range-picker-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Date Range"
      >
        <Calendar size={16} className="date-range-icon" />
        <span className="date-range-text">{selectedRange}</span>
        <ChevronDown size={14} className={`date-range-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <div className="date-range-dropdown">
          <div className="date-range-header">Filter by Date</div>
          <div className="date-range-options">
            {presets.map((preset, index) => {
              const isCurrent = selectedRange === preset || (preset.includes('12 May') && selectedRange.includes('12 May'));
              return (
                <button
                  key={index}
                  type="button"
                  className={`date-range-option ${isCurrent ? 'selected' : ''}`}
                  onClick={() => handleSelect(preset)}
                >
                  <span>{preset}</span>
                  {isCurrent && <Check size={14} className="date-range-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
