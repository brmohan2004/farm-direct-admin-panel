import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import Search from './Search';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';
import './Header.css';

const Header = () => {
  return (
    <header className="header-root">
      <div className="header-left">
        <NavLink to="/dashboard" className="header-logo-wrap">
          <Sprout className="header-logo-icon" />
          <div className="header-logo-text">
            <span className="header-brand-title">Farm<span style={{ color: 'var(--primary)' }}>Direct</span></span>
            <span className="header-brand-sub">Admin Panel</span>
          </div>
        </NavLink>
      </div>

      <div className="header-center">
        <Search />
      </div>

      <div className="header-right">
        <Notification count={12} messageCount={5} />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
