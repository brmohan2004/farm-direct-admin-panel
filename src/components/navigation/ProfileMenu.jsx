import React from 'react';
import farmerImg from '../../assets/farmer.png';
import './ProfileMenu.css';

const ProfileMenu = () => {
  return (
    <div className="profile-menu-container">
      <div className="avatar-wrapper">
        <img src={farmerImg} alt="Admin Profile" className="profile-avatar-img" />
        <span className="status-dot-online" />
      </div>
      <div className="profile-info">
        <span className="profile-name">Admin</span>
        <span className="profile-role">Super Admin</span>
      </div>
    </div>
  );
};

export default ProfileMenu;
