import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './CategorySelectDropdown.css';

/**
 * CategorySelectDropdown Component
 * Global reusable category filter dropdown component
 */
const CategorySelectDropdown = ({
  value = 'All Categories',
  onChange,
  categories = [
    'All Categories',
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Millets',
    'Dairy',
    'Spices',
    'Oils',
    'Beverages'
  ],
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (cat) => {
    if (onChange) onChange(cat);
    setIsOpen(false);
  };

  return (
    <div className={`category-select-container ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`category-select-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Category"
      >
        <span className="category-select-text">{value}</span>
        <ChevronDown size={16} className={`category-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <div className="category-select-dropdown">
          {categories.map((cat, index) => {
            const isSelected = value === cat || (value === 'All' && cat === 'All Categories');
            return (
              <button
                key={index}
                type="button"
                className={`category-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(cat)}
              >
                <span>{cat}</span>
                {isSelected && <Check size={14} className="category-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySelectDropdown;
