import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sprout, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-wrapper">
      {/* Left Branding Hero Panel */}
      <div className="auth-banner-side">
        <div className="auth-banner-overlay" />
        
        {/* Brand Header */}
        <div className="auth-brand-logo">
          <div className="brand-icon-box">
            <Sprout size={26} />
          </div>
          <div>
            <span className="brand-text-name">FarmDirect</span>
            <span className="brand-text-tag">Admin Management Portal</span>
          </div>
        </div>

        {/* Hero Middle Content */}
        <div className="auth-banner-content">
          <h1 className="auth-banner-headline">
            Streamlining Direct Farm Supply Chain & Operations
          </h1>
          <p className="auth-banner-desc">
            Empowering agricultural direct trade with real-time stock management, transparent farmer payouts, and instant order tracking.
          </p>

          {/* Quick Stat Chips */}
          <div className="auth-banner-stats">
            <div className="auth-stat-chip">
              <div className="stat-chip-num">1,250+</div>
              <div className="stat-chip-lbl">Verified Farmers</div>
            </div>
            <div className="auth-stat-chip">
              <div className="stat-chip-num">99.8%</div>
              <div className="stat-chip-lbl">On-Time Deliveries</div>
            </div>
          </div>
        </div>

        {/* Hero Footer */}
        <div className="auth-banner-footer">
          © {new Date().getFullYear()} FarmDirect Admin System. Secured with enterprise encryption.
        </div>
      </div>

      {/* Right Auth Form Area */}
      <div className="auth-form-side">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
