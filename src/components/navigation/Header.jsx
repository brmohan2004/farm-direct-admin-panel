import React from 'react';
import { Sprout } from 'lucide-react';
import Search from './Search';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';
import './Header.css';

const Header = () => {
  return (
    <header className="header-root">
      <div className="header-left">
        <div className="mobile-logo-wrap">
          <Sprout className="mobile-logo-icon" />
          <div className="mobile-logo-text">
            <span className="mobile-brand-title">Farm<span style={{ color: 'var(--primary)' }}>Direct</span></span>
            <span className="mobile-brand-sub">Admin Panel</span>
          </div>
        </div>
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
