import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {
  SettingsHeader,
  SettingsSection,
  SettingsItem,
  SettingsSecurityCard,
  SettingsModal
} from './components';

import './SettingsPage.css';

/**
 * SettingsPage Component
 * Fully responsive mobile, tablet, and desktop settings page with logout capability.
 */
const SettingsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSetting, setSelectedSetting] = useState(null);

  // General Settings Group
  const generalSettings = [
    {
      id: 'general',
      iconType: 'general',
      title: 'General Settings',
      description: 'Manage app name, logo and basic settings.'
    },
    {
      id: 'notifications',
      iconType: 'notifications',
      title: 'Push Notifications',
      description: 'Configure push notification preferences.'
    },
    {
      id: 'privacy',
      iconType: 'privacy',
      title: 'Privacy & Policy',
      description: 'Manage privacy policy and terms.'
    },
    {
      id: 'app-content',
      iconType: 'app-content',
      title: 'App Content',
      description: 'Manage app static content and pages.'
    }
  ];

  // App Configuration Group
  const appConfigurationSettings = [
    {
      id: 'home-page',
      iconType: 'home-page',
      title: 'Home Page Settings',
      description: 'Manage home page sections and banner.'
    },
    {
      id: 'banners',
      iconType: 'banners',
      title: 'Banners',
      description: 'Manage app banners and promotions.'
    },
    {
      id: 'categories',
      iconType: 'categories',
      title: 'Categories',
      description: 'Manage product categories.'
    },
    {
      id: 'offers',
      iconType: 'offers',
      title: 'Offers & Discounts',
      description: 'Manage offers and discount settings.'
    }
  ];

  // Support & Account Group
  const supportSettings = [
    {
      id: 'support',
      iconType: 'support',
      title: 'Support Settings',
      description: 'Manage support options and contact details.'
    },
    {
      id: 'system',
      iconType: 'system',
      title: 'System Settings',
      description: 'Manage app update and system preferences.'
    },
    {
      id: 'logout',
      iconType: 'logout',
      title: 'Log Out Session',
      description: 'Sign out securely from admin dashboard.'
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/auth/login', { replace: true });
  };

  // Filter items based on search query
  const filterItems = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  };

  const filteredGeneral = filterItems(generalSettings);
  const filteredAppConfig = filterItems(appConfigurationSettings);
  const filteredSupport = filterItems(supportSettings);

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      handleLogout();
      return;
    }
    setSelectedSetting(item);
  };

  const handleSecurityClick = () => {
    setSelectedSetting({
      id: 'security',
      iconType: 'security',
      title: 'Security & Encryption',
      description: 'System security status and encryption verification'
    });
  };

  return (
    <div className="page-container settings-page-container">
      {/* Header Section */}
      <SettingsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Settings Responsive Grid (2 columns on desktop, 1 column on mobile/tablet) */}
      <div className="settings-content-grid">
        {/* Left Column: Settings Sections List */}
        <div className="settings-main-column">
          {/* Section 1: GENERAL SETTINGS */}
          {filteredGeneral.length > 0 && (
            <SettingsSection title="GENERAL SETTINGS">
              {filteredGeneral.map((item, idx) => (
                <SettingsItem
                  key={item.id}
                  iconType={item.iconType}
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  isLast={idx === filteredGeneral.length - 1}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </SettingsSection>
          )}

          {/* Section 2: APP CONFIGURATION */}
          {filteredAppConfig.length > 0 && (
            <SettingsSection title="APP CONFIGURATION">
              {filteredAppConfig.map((item, idx) => (
                <SettingsItem
                  key={item.id}
                  iconType={item.iconType}
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  isLast={idx === filteredAppConfig.length - 1}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </SettingsSection>
          )}

          {/* Section 3: SUPPORT & ACCOUNT */}
          {filteredSupport.length > 0 && (
            <SettingsSection title="SUPPORT & ACCOUNT">
              {filteredSupport.map((item, idx) => (
                <SettingsItem
                  key={item.id}
                  iconType={item.iconType}
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  isLast={idx === filteredSupport.length - 1}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </SettingsSection>
          )}

          {/* Dedicated Quick Logout Banner for Mobile */}
          <div className="settings-mobile-logout-box">
            <button
              type="button"
              className="settings-mobile-logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Log Out Admin Session</span>
            </button>
          </div>

          {/* Fallback if search matches nothing */}
          {filteredGeneral.length === 0 &&
            filteredAppConfig.length === 0 &&
            filteredSupport.length === 0 && (
              <div className="settings-empty-search">
                <p>No settings matching "{searchQuery}"</p>
                <button
                  className="settings-reset-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </div>
            )}

          {/* Mobile security banner rendered inside list flow for mobile screens */}
          <div className="settings-mobile-security-wrapper">
            <SettingsSecurityCard
              lastUpdated="20 Aug 2026 10:45 AM"
              statusText="Settings are safe and secure"
              description="Your app settings are protected and encrypted."
              onSecurityClick={handleSecurityClick}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {/* Right Column: Desktop Security Card */}
        <div className="settings-sidebar-column">
          <SettingsSecurityCard
            lastUpdated="20 Aug 2026 10:45 AM"
            statusText="Settings are safe and secure"
            description="All your settings data are encrypted and protected."
            onSecurityClick={handleSecurityClick}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Interactive Settings Edit Modal */}
      <SettingsModal
        isOpen={Boolean(selectedSetting)}
        onClose={() => setSelectedSetting(null)}
        settingItem={selectedSetting}
      />
    </div>
  );
};

export default SettingsPage;
