import React from 'react';
import './SettingsSection.css';

/**
 * SettingsSection Component
 * Wraps a collection of SettingsItem components under a category title (e.g. GENERAL SETTINGS)
 */
const SettingsSection = ({ title = '', children, className = '' }) => {
  return (
    <div className={`settings-section ${className}`}>
      {title && <h2 className="settings-section-title">{title}</h2>}
      <div className="settings-section-card">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
