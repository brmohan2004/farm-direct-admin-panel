import React, { useState, useEffect, useRef } from 'react';
import {
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Calendar,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { StatusBadge, UserAvatar, OrderIconAvatar } from '../../../../components/ui';
import './ConsumerDetailsSheet.css';

/**
 * ConsumerDetailsSheet Component
 * Mobile-specific Bottom Sheet / Slide-up view with expandable scroll/drag behavior
 */
const ConsumerDetailsSheet = ({ isOpen = false, onClose, consumer = null }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const touchStartY = useRef(0);
  const lastScrollTop = useRef(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExpanded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !consumer) return null;

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    if (currentScrollTop > 15 && !isExpanded) {
      setIsExpanded(true);
    } else if (currentScrollTop <= 2 && isExpanded && currentScrollTop < lastScrollTop.current) {
      setIsExpanded(false);
    }
    lastScrollTop.current = currentScrollTop;
  };

  const handleWheel = (e) => {
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;
    if (e.deltaY > 0 && !isExpanded) {
      setIsExpanded(true);
    } else if (e.deltaY < 0 && bodyScrollTop <= 2 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;

    if (deltaY < -20 && !isExpanded) {
      setIsExpanded(true);
    } else if (deltaY > 30 && bodyScrollTop <= 5) {
      if (isExpanded) {
        setIsExpanded(false);
        touchStartY.current = touchY;
      } else {
        if (onClose) onClose();
      }
    }
  };

  return (
    <div className="consumer-sheet-backdrop" onClick={onClose}>
      <div
        className={`consumer-sheet-container ${isExpanded ? 'expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Top Handle */}
        <div
          className="consumer-sheet-handle-bar"
          onClick={() => setIsExpanded((prev) => !prev)}
          role="button"
          aria-label="Toggle sheet height"
        >
          <div className="consumer-sheet-handle" />
        </div>

        {/* Sheet Content Scroll Body */}
        <div
          className="consumer-sheet-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
          {/* Top Profile Header Card */}
          <div className="consumer-sheet-card consumer-sheet-profile-card">
            <div className="consumer-sheet-profile-top">
              <UserAvatar src={consumer.avatar} name={consumer.name} size="lg" />
              <div className="consumer-sheet-profile-text">
                <div className="consumer-sheet-name-status">
                  <h3 className="consumer-sheet-name">{consumer.name}</h3>
                  <StatusBadge status={consumer.status} size="sm" />
                </div>
                <div className="consumer-sheet-contacts">
                  <div className="sheet-contact-line">
                    <Phone size={13} className="sheet-icon" />
                    <span>{consumer.phone}</span>
                  </div>
                  <div className="sheet-contact-line">
                    <Mail size={13} className="sheet-icon" />
                    <span>{consumer.email}</span>
                  </div>
                  <div className="sheet-contact-line">
                    <MapPin size={13} className="sheet-icon" />
                    <span>{consumer.location}</span>
                  </div>
                </div>
              </div>

              <button
                className="consumer-sheet-more-btn"
                onClick={() => alert(`Actions for ${consumer.name}`)}
              >
                <MoreVertical size={18} />
              </button>
            </div>

            {/* 4 Metric Badges Row (2x2 Grid) */}
            <div className="consumer-sheet-metrics-grid">
              <div className="sheet-metric-box sheet-metric-box--green">
                <div className="sheet-metric-icon">
                  <ShoppingBag size={16} />
                </div>
                <span className="sheet-metric-val">{consumer.totalOrders}</span>
                <span className="sheet-metric-lbl">Orders</span>
              </div>

              <div className="sheet-metric-box sheet-metric-box--blue">
                <div className="sheet-metric-icon">
                  <IndianRupee size={16} />
                </div>
                <span className="sheet-metric-val">{consumer.formattedTotalSpent}</span>
                <span className="sheet-metric-lbl">Total Spent</span>
              </div>

              <div className="sheet-metric-box sheet-metric-box--purple">
                <div className="sheet-metric-icon">
                  <Calendar size={16} />
                </div>
                <span className="sheet-metric-val">{consumer.joinedOn}</span>
                <span className="sheet-metric-lbl">Joined On</span>
              </div>

              <div className="sheet-metric-box sheet-metric-box--orange">
                <div className="sheet-metric-icon">
                  <Clock size={16} />
                </div>
                <span className="sheet-metric-val">{consumer.lastOrderTimeAgo}</span>
                <span className="sheet-metric-lbl">Last Order</span>
              </div>
            </div>
          </div>

          {/* Mobile Tabs Bar */}
          <div className="consumer-sheet-tabs">
            {['overview', 'orders', 'addresses', 'activity'].map((tab) => (
              <button
                key={tab}
                className={`consumer-sheet-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB CONTENT */}
          {activeTab === 'overview' && (
            <div className="consumer-sheet-tab-content">
              {/* Profile Information Card */}
              <div className="consumer-sheet-card">
                <h4 className="consumer-sheet-section-title">Profile Information</h4>
                <div className="consumer-sheet-fields">
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Full Name</span>
                    <span className="sheet-field-val font-bold">{consumer.name}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Phone Number</span>
                    <span className="sheet-field-val">{consumer.phone}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Email Address</span>
                    <span className="sheet-field-val">{consumer.email}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Location</span>
                    <span className="sheet-field-val">{consumer.location}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Status</span>
                    <StatusBadge status={consumer.status} size="sm" />
                  </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="consumer-sheet-card">
                <h4 className="consumer-sheet-section-title">Order Summary</h4>
                <div className="consumer-sheet-fields">
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Total Orders</span>
                    <span className="sheet-field-val font-bold">{consumer.totalOrders}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Total Spent</span>
                    <span className="sheet-field-val font-bold">{consumer.formattedTotalSpent}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Average Order Value</span>
                    <span className="sheet-field-val">{consumer.avgOrderValue}</span>
                  </div>
                  <div className="sheet-field-row">
                    <span className="sheet-field-lbl">Last Order Date</span>
                    <span className="sheet-field-val">{consumer.lastOrderDate}</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Card */}
              <div className="consumer-sheet-card">
                <div className="consumer-sheet-card-header">
                  <h4 className="consumer-sheet-section-title">Recent Orders</h4>
                  <button className="consumer-sheet-link-btn">View All</button>
                </div>

                <div className="consumer-sheet-recent-orders">
                  {(consumer.recentOrders || []).slice(0, 3).map((ord) => (
                    <div key={ord.id} className="sheet-recent-order-row">
                      <OrderIconAvatar status={ord.status} size="sm" />
                      <div className="sheet-order-meta">
                        <span className="sheet-order-no">{ord.number}</span>
                        <span className="sheet-order-date">{ord.date}</span>
                        <StatusBadge status={ord.status} size="sm" />
                      </div>
                      <div className="sheet-order-right">
                        <span className="sheet-order-amount">{ord.amount}</span>
                        <ChevronRight size={16} className="sheet-chevron" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="consumer-sheet-card">
              <h4 className="consumer-sheet-section-title">All Consumer Orders</h4>
              <div className="consumer-sheet-recent-orders" style={{ marginTop: '12px' }}>
                {(consumer.recentOrders || []).map((ord) => (
                  <div key={ord.id} className="sheet-recent-order-row">
                    <OrderIconAvatar status={ord.status} size="sm" />
                    <div className="sheet-order-meta">
                      <span className="sheet-order-no">{ord.number}</span>
                      <span className="sheet-order-date">{ord.date}</span>
                    </div>
                    <div className="sheet-order-right">
                      <StatusBadge status={ord.status} size="sm" />
                      <span className="sheet-order-amount">{ord.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="consumer-sheet-card">
              <h4 className="consumer-sheet-section-title">Saved Addresses</h4>
              <div className="consumer-sheet-fields" style={{ marginTop: '10px' }}>
                {(consumer.addresses || []).map((addr) => (
                  <div key={addr.id} className="sheet-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span className="sheet-field-lbl font-bold">{addr.type}</span>
                      {addr.isDefault && <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>Default</span>}
                    </div>
                    <span className="sheet-field-val" style={{ textAlign: 'left' }}>{addr.line}, {addr.city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="consumer-sheet-card">
              <h4 className="consumer-sheet-section-title">Activity Log</h4>
              <div className="consumer-sheet-fields" style={{ marginTop: '10px' }}>
                {(consumer.activities || []).map((act) => (
                  <div key={act.id} className="sheet-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                    <span className="sheet-field-val font-bold">{act.text}</span>
                    <span className="sheet-field-lbl">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer Bar */}
        <div className="consumer-sheet-footer">
          <button type="button" className="consumer-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDetailsSheet;
