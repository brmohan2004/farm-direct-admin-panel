import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, ChevronRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import './RecentOrders.css';

const orders = [
  {
    id: '#FD123456',
    customer: 'Priya S.',
    date: '12 May, 09:41 AM',
    amount: '₹486.50',
    status: 'Delivered',
    statusClass: 'delivered',
    iconColor: 'green',
    statusIcon: CheckCircle2
  },
  {
    id: '#FD123455',
    customer: 'Karthik R.',
    date: '12 May, 08:15 AM',
    amount: '₹632.00',
    status: 'Processing',
    statusClass: 'processing',
    iconColor: 'orange',
    statusIcon: Clock
  },
  {
    id: '#FD123454',
    customer: 'Meena T.',
    date: '11 May, 06:30 PM',
    amount: '₹299.00',
    status: 'Shipped',
    statusClass: 'shipped',
    iconColor: 'blue',
    statusIcon: Truck
  },
  {
    id: '#FD123453',
    customer: 'Suresh V.',
    date: '11 May, 05:20 PM',
    amount: '₹1,120.00',
    status: 'Delivered',
    statusClass: 'delivered',
    iconColor: 'green',
    statusIcon: CheckCircle2
  },
  {
    id: '#FD123452',
    customer: 'Anita P.',
    date: '11 May, 04:10 PM',
    amount: '₹545.00',
    status: 'Processing',
    statusClass: 'processing',
    iconColor: 'orange',
    statusIcon: Clock
  }
];

const RecentOrders = ({ hideHeader = false }) => {
  const content = (
    <div className="orders-list">
      {orders.map((item) => {
        const StatusIcon = item.statusIcon;
        return (
          <div key={item.id} className="order-item-row">
            <div className="order-item-left">
              <div className={`order-icon-bag ${item.iconColor}`}>
                <ShoppingBag size={18} />
              </div>
              <div className="order-details">
                <span className="order-id">{item.id}</span>
                <span className="order-customer">{item.customer}</span>
                <span className="order-date">{item.date}</span>
              </div>
            </div>

            <div className="order-item-right">
              <span className="order-amount">{item.amount}</span>
              <span className={`status-pill ${item.statusClass}`}>
                <StatusIcon size={13} />
                {item.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (hideHeader) return content;

  return (
    <div className="orders-card">
      <div className="orders-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <h3 className="chart-title">Recent Orders</h3>
          <span className="card-header-badge">56</span>
        </div>
        <NavLink to="/order-management/orders" className="view-all-link">
          View All <ChevronRight size={16} />
        </NavLink>
      </div>
      {content}
    </div>
  );
};

export default RecentOrders;
