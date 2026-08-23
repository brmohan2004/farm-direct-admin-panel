import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Inbox, 
  ShoppingBag, 
  Grid, 
  ShoppingCart, 
  User, 
  CreditCard, 
  Wallet, 
  Bell, 
  Settings, 
  HelpCircle,
  ArrowRight,
  X
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Farmer Requests', path: '/farmer-management/requests', icon: UserPlus, badge: 18 },
  { label: 'Farmers', path: '/farmer-management/farmers', icon: Users },
  { label: 'Stock Inbox', path: '/stock-management/inbox', icon: Inbox, badge: 24 },
  { label: 'Products', path: '/product-management/products', icon: ShoppingBag },
  { label: 'Categories', path: '/product-management/categories', icon: Grid },
  { label: 'Orders', path: '/order-management/orders', icon: ShoppingCart, badge: 56 },
  { label: 'Consumers', path: '/consumer-management/consumers', icon: User },
  { label: 'Transactions', path: '/payment-management/payments', icon: CreditCard },
  { label: 'Farmer Payouts', path: '/farmer-payouts/payouts', icon: Wallet },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar-root admin-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        {isOpen && (
          <div className="sidebar-mobile-close-bar">
            <button 
              onClick={onClose} 
              className="sidebar-close-btn"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <ul className="sidebar-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="sidebar-nav-item">
                <NavLink 
                  to={item.path} 
                  onClick={onClose}
                  className={({ isActive }) => 
                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <div className="sidebar-link-left">
                    <Icon className="sidebar-link-icon" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-help-card">
          <div className="help-card-title">
            <HelpCircle size={18} style={{ color: 'var(--primary)' }} />
            <span>Need Help?</span>
          </div>
          <p className="help-card-desc">We're here to help you</p>
          <a href="#support" className="help-card-link">
            Contact Support <ArrowRight size={14} />
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
