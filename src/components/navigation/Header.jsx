import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import Search from './Search';
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
  if (pathname.includes('/stock-management/requests')) return 'Stock Request Details';
  if (pathname.includes('/stock-management/inventory')) return 'Inventory';
  if (pathname.includes('/product-management/products')) return 'Products';
  if (pathname.includes('/product-management/add')) return 'Add Product';
  if (pathname.includes('/product-management/categories')) return 'Categories';
  if (pathname.includes('/farmer-management/requests')) return 'Farmer Requests';
  if (pathname.includes('/farmer-management/verification')) return 'Farmer Verification';
  if (pathname.includes('/farmer-management/farmers')) return 'Farmers';
  if (pathname.includes('/farmer-management/farmer-details')) return 'Farmer Details';
  if (pathname.includes('/notifications')) return 'Notifications';
  if (pathname.includes('/settings')) return 'Settings';
  return 'FarmDirect Admin';
};

const Header = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="header-root">
      <div className="header-left">
        <NavLink to="/dashboard" className="header-logo-wrap">
          <Sprout className="header-logo-icon" />
          <div className="header-logo-text desktop-only-brand">
            <span className="header-brand-title">Farm<span style={{ color: 'var(--primary)' }}>Direct</span></span>
            <span className="header-brand-sub">Admin Panel</span>
          </div>
        </NavLink>

        {/* Respective Page Name displayed ONLY on Mobile Screen */}
        <div className="header-mobile-page-name" title={pageTitle}>
          {pageTitle}
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
