import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  ConsumerSheetHeader,
  ConsumerSheetTabs,
  ConsumerSheetOverviewTab,
  ConsumerSheetOrdersTab,
  ConsumerSheetAddressesTab,
  ConsumerSheetActivityTab,
} from './components';
import './ConsumerDetailsSheet.css';

/**
 * ConsumerDetailsSheet Component
 * Mobile-specific Bottom Sheet / Slide-up view
 */
const ConsumerDetailsSheet = ({ isOpen = true, onClose, consumer: propConsumer = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const mockConsumer = propConsumer || {
    id: id || 'CNS-9021',
    name: 'Anitha Rajan',
    status: 'Active',
    phone: '+91 98401 23456',
    email: 'anitha.r@gmail.com',
    location: 'Anna Nagar, Chennai, TN',
    avatar: '',
    totalOrders: 18,
    formattedTotalSpent: '₹14,250',
    joinedOn: '15 Jan 2024',
    lastOrderTimeAgo: '2 hours ago',
    avgOrderValue: '₹791',
    lastOrderDate: '23 Aug 2026',
    recentOrders: [
      { id: '1', number: 'ORD-9821', date: '23 Aug 2026', status: 'Delivered', amount: '₹1,240' },
      { id: '2', number: 'ORD-9750', date: '18 Aug 2026', status: 'Delivered', amount: '₹850' },
      { id: '3', number: 'ORD-9610', date: '12 Aug 2026', status: 'Delivered', amount: '₹2,100' }
    ],
    addresses: [
      { id: 'a1', type: 'Home', line: 'Door 42, 5th Avenue, Anna Nagar', city: 'Chennai - 600040', isDefault: true }
    ],
    activities: [
      { id: 'c1', text: 'Order #ORD-9821 Delivered successfully', time: 'Today, 11:30 AM' }
    ]
  };

  const consumer = mockConsumer;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="consumer-sheet-backdrop" onClick={handleClose}>
      <div
        className="consumer-sheet-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle */}
        <div className="consumer-sheet-handle-bar">
          <div className="consumer-sheet-handle" />
        </div>

        {/* Back Navigation Bar */}
        <div className="consumer-sheet-nav-bar">
          <button className="consumer-sheet-back-btn" onClick={handleClose}>
            <ArrowLeft size={18} />
            <span>Back to Consumers</span>
          </button>
        </div>

        {/* Sheet Content Scroll Body */}
        <div className="consumer-sheet-body">
          <ConsumerSheetHeader consumer={consumer} />

          <ConsumerSheetTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {activeTab === 'overview' && (
            <ConsumerSheetOverviewTab
              consumer={consumer}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'orders' && (
            <ConsumerSheetOrdersTab consumer={consumer} />
          )}

          {activeTab === 'addresses' && (
            <ConsumerSheetAddressesTab consumer={consumer} />
          )}

          {activeTab === 'activity' && (
            <ConsumerSheetActivityTab consumer={consumer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDetailsSheet;
