import React from 'react';
import {
  Sliders,
  Bell,
  ShieldCheck,
  FileText,
  SlidersHorizontal,
  Megaphone,
  Grid,
  Percent,
  Headphones,
  Cpu,
  Shield,
  Cog
} from 'lucide-react';
import './SettingsIconAvatar.css';

const SETTINGS_PRESETS = {
  general: {
    bgColor: '#f3e8ff',
    iconColor: '#7c3aed',
    icon: Sliders
  },
  notifications: {
    bgColor: '#dcfce7',
    iconColor: '#16a34a',
    icon: Bell
  },
  privacy: {
    bgColor: '#dbeafe',
    iconColor: '#2563eb',
    icon: ShieldCheck
  },
  'app-content': {
    bgColor: '#ffedd5',
    iconColor: '#ea580c',
    icon: FileText
  },
  'home-page': {
    bgColor: '#ffe4e6',
    iconColor: '#e11d48',
    icon: SlidersHorizontal
  },
  banners: {
    bgColor: '#cffafe',
    iconColor: '#0891b2',
    icon: Megaphone
  },
  categories: {
    bgColor: '#d1fae5',
    iconColor: '#059669',
    icon: Grid
  },
  offers: {
    bgColor: '#ede9fe',
    iconColor: '#7c3aed',
    icon: Percent
  },
  support: {
    bgColor: '#fef3c7',
    iconColor: '#d97706',
    icon: Headphones
  },
  system: {
    bgColor: '#e0e7ff',
    iconColor: '#4f46e5',
    icon: Cpu
  },
  security: {
    bgColor: '#dcfce7',
    iconColor: '#16a34a',
    icon: Shield
  }
};

/**
 * SettingsIconAvatar Component
 * Renders a rounded icon badge with pastel background for settings options
 */
const SettingsIconAvatar = ({
  type = 'general',
  customBgColor,
  customIconColor,
  size = 'md',
  className = ''
}) => {
  const preset = SETTINGS_PRESETS[type] || SETTINGS_PRESETS.general;
  const backgroundColor = customBgColor || preset.bgColor;
  const color = customIconColor || preset.iconColor;
  const IconComponent = preset.icon || Cog;

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };

  return (
    <div
      className={`settings-icon-avatar settings-icon-avatar--${size} ${className}`}
      style={{ backgroundColor }}
    >
      <IconComponent size={iconSizes[size] || 20} color={color} strokeWidth={2} />
    </div>
  );
};

export default SettingsIconAvatar;
