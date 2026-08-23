import React from 'react';
import { ChevronDown } from 'lucide-react';
import './IconInput.css';

/**
 * IconInput Component
 * Form input with a light-green rounded icon badge on the left side,
 * matching the FarmDirect design system.
 */
const IconInput = ({
  label,
  required = false,
  icon: IconComponent,
  type = 'text',
  value,
  onChange,
  placeholder,
  isSelect = false,
  options = [],
  children,
  rows,
  isTextarea = false,
  maxLength,
  charCount,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`icon-input-group ${className}`}>
      {label && (
        <label className="icon-input-label">
          {label}
          {required && <span className="required-asterisk"> *</span>}
        </label>
      )}

      <div className={`icon-input-wrapper ${isTextarea ? 'is-textarea' : ''}`}>
        {IconComponent && (
          <div className="input-icon-badge">
            <IconComponent size={18} className="input-badge-icon" />
          </div>
        )}

        {isTextarea ? (
          <textarea
            className="icon-input-field textarea-field"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows || 4}
            maxLength={maxLength}
            disabled={disabled}
          />
        ) : isSelect ? (
          <div className="select-field-container">
            <select
              className="icon-input-field select-field"
              value={value}
              onChange={onChange}
              disabled={disabled}
            >
              {options && options.length > 0
                ? options.map((opt, idx) => (
                    <option key={idx} value={opt.value !== undefined ? opt.value : opt}>
                      {opt.label !== undefined ? opt.label : opt}
                    </option>
                  ))
                : children}
            </select>
            <ChevronDown size={18} className="select-chevron-icon" />
          </div>
        ) : (
          <input
            type={type}
            className="icon-input-field"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}

        {isTextarea && maxLength && (
          <span className="textarea-char-counter">
            {charCount !== undefined ? charCount : value?.length || 0}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default IconInput;
