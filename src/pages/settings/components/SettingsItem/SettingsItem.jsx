import React from 'react';
import { ChevronRight } from 'lucide-react';
import SettingsIconAvatar from '../../../../components/ui/SettingsIconAvatar/SettingsIconAvatar';
import './SettingsItem.css';

/**
 * SettingsItem Component
 * Single settings row item with icon avatar, title, description, and chevron arrow
 */
const SettingsItem = ({
  iconType = 'general',
  title = '',
  description = '',
  badge = null,
  onClick,
  isLast = false,
  customBgColor,
  customIconColor
}) => {
  return (
    <div
      className={`settings-item ${isLast ? 'settings-item--last' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <div className="settings-item-left">
        <SettingsIconAvatar
          type={iconType}
          customBgColor={customBgColor}
          customIconColor={customIconColor}
          size="md"
        />
        <div className="settings-item-content">
          <div className="settings-item-title-row">
            <h3 className="settings-item-title">{title}</h3>
            {badge && <span className="settings-item-badge">{badge}</span>}
          </div>
          <p className="settings-item-description">{description}</p>
        </div>
      </div>

      <div className="settings-item-right">
        <ChevronRight className="settings-item-arrow" size={20} />
      </div>
    </div>
  );
};

export default SettingsItem;
