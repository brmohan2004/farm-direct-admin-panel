import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, ChevronRight, ShieldAlert, KeyRound } from 'lucide-react';
import './SettingsSecurityCard.css';

/**
 * SettingsSecurityCard Component
 * Displays security status, encryption info, and system health status.
 * Renders as a dedicated sidebar card on Desktop/Tablet and a full-width banner on Mobile.
 */
const SettingsSecurityCard = ({
  lastUpdated = '20 Aug 2026 10:45 AM',
  statusText = 'Settings are safe and secure',
  description = 'All your settings data are encrypted and protected.',
  onSecurityClick
}) => {
  return (
    <div className="settings-security-card" onClick={onSecurityClick}>
      {/* Desktop & Tablet Widget Layout */}
      <div className="security-card-desktop">
        <div className="security-illustration">
          <div className="security-shield-outer">
            <div className="security-shield-inner">
              <ShieldCheck size={36} className="security-icon-main" />
              <span className="security-badge-check">
                <CheckCircle2 size={16} fill="#16a34a" color="#ffffff" />
              </span>
            </div>
            <Lock size={14} className="security-floating-icon security-floating-lock" />
            <KeyRound size={14} className="security-floating-icon security-floating-key" />
          </div>
        </div>

        <div className="security-content">
          <h3 className="security-title">{statusText}</h3>
          <p className="security-description">{description}</p>
        </div>

        <div className="security-status-box">
          <div className="security-status-pill">
            <span className="security-pulse-dot"></span>
            <ShieldCheck size={16} className="security-status-icon" />
            <span className="security-status-text">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Mobile Banner Layout */}
      <div className="security-card-mobile">
        <div className="security-mobile-left">
          <div className="security-mobile-icon-badge">
            <ShieldCheck size={20} color="#16a34a" />
          </div>
          <div className="security-mobile-text">
            <h4 className="security-mobile-title">{statusText}</h4>
            <p className="security-mobile-desc">Your app settings are protected and encrypted.</p>
          </div>
        </div>
        <ChevronRight size={18} className="security-mobile-arrow" />
      </div>
    </div>
  );
};

export default SettingsSecurityCard;
