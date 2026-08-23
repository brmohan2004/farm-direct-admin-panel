import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import './ProfileMenu.css';

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <button
      type="button"
      className="profile-menu-container settings-header-trigger"
      onClick={handleSettingsClick}
      aria-label="Settings"
      title="Settings"
    >
      <div className="settings-icon-wrapper">
        <Settings size={20} className="settings-header-icon" />
      </div>
      <div className="profile-info">
        <span className="profile-name">Settings</span>
        <span className="profile-role">Admin Control</span>
      </div>
    </button>
  );
};

export default ProfileMenu;
