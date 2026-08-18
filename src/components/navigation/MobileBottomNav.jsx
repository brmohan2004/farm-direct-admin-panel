import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Inbox, 
  Users, 
  Grid, 
  CreditCard, 
  Wallet, 
  Layers, 
  Map,
  ChevronRight,
  X 
} from 'lucide-react';
import './MobileBottomNav.css';

const mainNavItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Products', path: '/product-management/products', icon: Package },
  { label: 'Stock Inbox', path: '/stock-management/inbox', icon: Inbox, badge: 24 },
  { label: 'Consumers', path: '/consumer-management/consumers', icon: Users },
];

const moreNavItems = [
  { label: 'Payment', path: '/payment-management/payments', icon: CreditCard },
  { label: 'Payout', path: '/farmer-payouts/payouts', icon: Wallet },
  { label: 'Categories', path: '/product-management/categories', icon: Layers },
];

const MobileBottomNav = () => {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  const isMoreActive = moreNavItems.some(item => location.pathname.startsWith(item.path));

  return (
    <>
      {/* Floating View Farmers Banner Floating Above Mobile Navbar */}
      <NavLink to="/farmer-management/farmers" className="floating-view-farmers-btn">
        <div className="floating-farmers-icon-circle">
          <Map size={18} />
        </div>
        <div className="floating-farmers-text">
          <span className="floating-farmers-title">View Farmers</span>
          <span className="floating-farmers-subtitle">Explore on map</span>
        </div>
        <div className="floating-farmers-arrow-circle">
          <ChevronRight size={15} />
        </div>
      </NavLink>

      <nav className="mobile-bottom-nav-root mobile-bottom-nav">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path) || (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} />
                {item.badge !== undefined && (
                  <span className="mobile-nav-badge">{item.badge}</span>
                )}
              </div>

              {isActive && (
                <span className="mobile-nav-label">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        <button 
          className={`mobile-nav-item ${isMoreActive || showMore ? 'active' : ''}`}
          onClick={() => setShowMore(!showMore)}
        >
          <div className="mobile-nav-icon-wrap">
            <Grid size={20} />
          </div>
          {(isMoreActive || showMore) && (
            <span className="mobile-nav-label">More</span>
          )}
        </button>
      </nav>

      {showMore && (
        <>
          <div className="more-sheet-backdrop" onClick={() => setShowMore(false)} />
          <div className="more-sheet-container">
            <div className="more-sheet-header">
              <h3 className="more-sheet-title">More Options</h3>
              <button className="more-sheet-close" onClick={() => setShowMore(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="more-sheet-grid">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`more-grid-item ${isActive ? 'active' : ''}`}
                    onClick={() => setShowMore(false)}
                  >
                    <div className="more-grid-icon-box">
                      <Icon size={20} />
                    </div>
                    <span className="more-grid-label">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileBottomNav;
