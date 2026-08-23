import React from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import Notification from './Notification';
import ProfileMenu from './ProfileMenu';
import './Header.css';

/**
 * Helper to get the human-readable page title based on current URL path
 */
const getPageTitle = (pathname) => {
  if (pathname.includes('/dashboard')) return 'Dashboard';
  if (pathname.includes('/payment-management/payments') || pathname.includes('/transactions')) return 'Transactions & Payouts';
  if (pathname.includes('/farmer-payouts/payouts')) return 'Farmer Payouts';
  if (pathname.includes('/consumer-management/consumers') || pathname.includes('/consumers')) return 'Consumers';
  if (pathname.includes('/consumer-details')) return 'Consumer Details';
  if (pathname.includes('/order-management/orders') || pathname.includes('/orders')) return 'Orders';
  if (pathname.includes('/order-details')) return 'Order Details';
  if (pathname.includes('/stock-management/inbox')) return 'Stock Inbox';
  if (pathname.includes('/product-management/products')) return 'Products';
  if (pathname.includes('/product-management/add')) return 'Add Product';
  if (pathname.includes('/product-management/categories')) return 'Categories';
  if (pathname.includes('/farmer-management/requests')) return 'Farmer Requests';
  if (pathname.includes('/farmer-management/farmers')) return 'Farmers';
  if (pathname.includes('/farmer-management/farmer-details')) return 'Farmer Details';
  if (pathname.includes('/notifications')) return 'Notifications';
  if (pathname.includes('/settings')) return 'Settings';
  return 'FarmDirect Admin';
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSettingsPage = location.pathname.includes('/settings');
  const isNotificationsPage = location.pathname.includes('/notifications');
  const showBackButton = isSettingsPage || isNotificationsPage;
  const isHomePage = location.pathname === '/dashboard' || location.pathname === '/';
  const pageTitle = getPageTitle(location.pathname);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <header className="header-root">
      <div className="header-left">
        {showBackButton ? (
          <button
            type="button"
            className="header-back-btn"
            onClick={handleBack}
            aria-label="Go Back"
          >
            <ArrowLeft size={18} />
            <span className="header-back-text">Back</span>
          </button>
        ) : (
          <NavLink to="/dashboard" className={`header-logo-wrap ${isHomePage ? 'is-home-logo' : 'is-other-logo'}`}>
            <Sprout className="header-logo-icon" />
            <div className="header-logo-text">
              <span className="header-brand-title">Farm<span style={{ color: 'var(--primary)' }}>Direct</span></span>
              <span className="header-brand-sub">Admin Panel</span>
            </div>
          </NavLink>
        )}

        {!isHomePage && (
          <div className="header-mobile-page-name" title={pageTitle}>
            {pageTitle}
          </div>
        )}
      </div>

      <div className="header-right">
        {!showBackButton && (
          <>
            <Notification count={12} />
            <ProfileMenu />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
