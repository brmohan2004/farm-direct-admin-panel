import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tag, Inbox, UserPlus, ClipboardList, Users, AlertTriangle, PackageX, Mail, CheckCircle } from 'lucide-react';
import './QuickActions.css';

const quickActions = [
  { label: 'Add Product', path: '/product-management/add', icon: Tag },
  { label: 'Stock Inbox', path: '/stock-management/inbox', icon: Inbox, badge: 12 },
  { label: 'Farmer Requests', path: '/farmer-management/requests', icon: UserPlus, badge: 8 },
  { label: 'Orders', path: '/order-management/orders', icon: ClipboardList, badge: 24 },
];

const miniStats = [
  { label: 'New Farmer Requests', val: '18', trend: '+5 vs last week', icon: UserPlus, bg: '#dcfce7', color: '#16a34a' },
  { label: 'Stock Messages', val: '24', trend: '+8 vs last week', icon: Mail, bg: '#fef3c7', color: '#b45309' },
  { label: 'Low Stock Alerts', val: '32', trend: '+6 vs last week', icon: AlertTriangle, bg: '#ffedd5', color: '#ea580c' },
  { label: 'Out of Stock', val: '12', trend: '+3 vs last week', icon: PackageX, bg: '#f3e8ff', color: '#9333ea' },
  { label: 'Active Farmers', val: '412', trend: '+15 vs last week', icon: CheckCircle, bg: '#dbeafe', color: '#2563eb' },
];

const QuickActions = () => {
  return (
    <div className="quick-actions-section">
      {/* Mobile view quick actions */}
      <div className="mobile-only-block" style={{ width: '100%' }}>
        <h3 className="section-h3" style={{ marginBottom: '12px' }}>Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <NavLink key={action.path} to={action.path} className="quick-action-card">
                {action.badge !== undefined && (
                  <span className="quick-action-badge">{action.badge}</span>
                )}
                <div className="quick-action-icon">
                  <Icon size={20} />
                </div>
                <span className="quick-action-label">{action.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Desktop & Mobile Mini stats badges */}
      <div className="mini-stats-grid" style={{ marginTop: '12px' }}>
        {miniStats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="mini-stat-card">
              <div className="mini-stat-icon" style={{ backgroundColor: item.bg, color: item.color }}>
                <Icon size={18} />
              </div>
              <div className="mini-stat-info">
                <span className="mini-stat-label">{item.label}</span>
                <span className="mini-stat-val">{item.val}</span>
                <span className="mini-stat-trend">{item.trend}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
