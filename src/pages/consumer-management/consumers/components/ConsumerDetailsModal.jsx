import React, { useState } from 'react';
import {
  X,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Calendar,
  Clock,
  ChevronRight,
  FileText,
  Plus,
} from 'lucide-react';
import { StatusBadge, UserAvatar, OrderIconAvatar } from '../../../../components/ui';
import './ConsumerDetailsModal.css';

/**
 * ConsumerDetailsModal Component
 * Popup modal for Desktop and Tablet screens matching design Image 2
 */
const ConsumerDetailsModal = ({ isOpen = false, onClose, consumer = null }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !consumer) return null;

  return (
    <div className="consumer-modal-overlay" onClick={onClose}>
      <div
        className="consumer-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="consumer-modal-header">
          <div className="consumer-modal-header-text">
            <h2 className="consumer-modal-title">Consumer Details</h2>
            <p className="consumer-modal-subtitle">View and manage consumer information and activity.</p>
          </div>

          <div className="consumer-modal-header-actions">
            <button
              className="consumer-modal-action-btn"
              onClick={() => alert(`Actions for ${consumer.name}`)}
            >
              <MoreVertical size={16} />
              <span>Actions</span>
            </button>

            <button
              className="consumer-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="consumer-modal-body">
          {/* Profile Header Banner Box */}
          <div className="consumer-profile-banner">
            <div className="consumer-profile-main">
              <UserAvatar src={consumer.avatar} name={consumer.name} size="xl" />
              <div className="consumer-profile-meta">
                <div className="consumer-name-status-row">
                  <h3 className="consumer-profile-name-lg">{consumer.name}</h3>
                  <StatusBadge status={consumer.status} size="sm" />
                </div>

                <div className="consumer-contact-lines">
                  <div className="consumer-contact-item">
                    <Phone size={14} className="contact-icon" />
                    <span>{consumer.phone}</span>
                  </div>
                  <div className="consumer-contact-item">
                    <Mail size={14} className="contact-icon" />
                    <span>{consumer.email}</span>
                  </div>
                  <div className="consumer-contact-item">
                    <MapPin size={14} className="contact-icon" />
                    <span>{consumer.fullLocation || consumer.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Metric Stat Boxes */}
            <div className="consumer-metrics-row">
              <div className="consumer-metric-box consumer-metric-box--green">
                <div className="metric-icon-wrap">
                  <ShoppingBag size={18} />
                </div>
                <span className="metric-value">{consumer.totalOrders}</span>
                <span className="metric-label">Total Orders</span>
              </div>

              <div className="consumer-metric-box consumer-metric-box--blue">
                <div className="metric-icon-wrap">
                  <IndianRupee size={18} />
                </div>
                <span className="metric-value">{consumer.formattedTotalSpent}</span>
                <span className="metric-label">Total Spent</span>
              </div>

              <div className="consumer-metric-box consumer-metric-box--purple">
                <div className="metric-icon-wrap">
                  <Calendar size={18} />
                </div>
                <span className="metric-value">{consumer.joinedOn}</span>
                <span className="metric-label">Joined On</span>
              </div>

              <div className="consumer-metric-box consumer-metric-box--orange">
                <div className="metric-icon-wrap">
                  <Clock size={18} />
                </div>
                <span className="metric-value">{consumer.lastOrderTimeAgo}</span>
                <span className="metric-label">Last Order</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="consumer-modal-tabs">
            {['overview', 'orders', 'addresses', 'activity'].map((tab) => (
              <button
                key={tab}
                className={`consumer-modal-tab-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab View: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="consumer-tab-content-overview">
              <div className="consumer-overview-grid">
                {/* Column 1: Profile Information */}
                <div className="consumer-details-card">
                  <h4 className="consumer-card-title">Profile Information</h4>
                  <div className="consumer-field-list">
                    <div className="consumer-field-row">
                      <span className="field-label">Full Name</span>
                      <span className="field-value font-bold">{consumer.name}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Phone Number</span>
                      <span className="field-value">{consumer.phone}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Email Address</span>
                      <span className="field-value">{consumer.email}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Location</span>
                      <span className="field-value">{consumer.fullLocation || consumer.location}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Status</span>
                      <div className="field-value">
                        <StatusBadge status={consumer.status} size="sm" />
                      </div>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Joined On</span>
                      <span className="field-value">{consumer.joinedOnTime || consumer.joinedOn}</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Order Summary */}
                <div className="consumer-details-card">
                  <h4 className="consumer-card-title">Order Summary</h4>
                  <div className="consumer-field-list">
                    <div className="consumer-field-row">
                      <span className="field-label">Total Orders</span>
                      <span className="field-value font-bold">{consumer.totalOrders}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Total Spent</span>
                      <span className="field-value font-bold">{consumer.formattedTotalSpent}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Average Order Value</span>
                      <span className="field-value">{consumer.avgOrderValue}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">First Order Date</span>
                      <span className="field-value">{consumer.firstOrderDate}</span>
                    </div>
                    <div className="consumer-field-row">
                      <span className="field-label">Last Order Date</span>
                      <span className="field-value">{consumer.lastOrderDate}</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Recent Orders */}
                <div className="consumer-details-card">
                  <div className="consumer-card-header-flex">
                    <h4 className="consumer-card-title">Recent Orders</h4>
                    <button className="consumer-view-all-link">View All Orders &rarr;</button>
                  </div>

                  <div className="consumer-recent-orders-list">
                    {(consumer.recentOrders || []).map((ord) => (
                      <div key={ord.id} className="consumer-recent-order-item">
                        <div className="recent-order-left">
                          <OrderIconAvatar status={ord.status} size="sm" />
                          <div className="recent-order-meta">
                            <span className="recent-order-no">{ord.number}</span>
                            <span className="recent-order-date">{ord.date}</span>
                          </div>
                        </div>

                        <div className="recent-order-right">
                          <StatusBadge status={ord.status} size="sm" />
                          <span className="recent-order-amount">{ord.amount}</span>
                          <ChevronRight size={16} className="recent-order-chevron" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Notes Section */}
              <div className="consumer-details-card consumer-notes-card">
                <div className="consumer-card-header-flex">
                  <div className="notes-title-wrap">
                    <FileText size={18} className="notes-icon" />
                    <h4 className="consumer-card-title">Notes</h4>
                  </div>
                  <button className="consumer-add-note-btn">
                    <Plus size={14} />
                    <span>Add Note</span>
                  </button>
                </div>

                <div className="consumer-notes-body">
                  {consumer.notes && consumer.notes.length > 0 ? (
                    consumer.notes.map((note, idx) => (
                      <div key={idx} className="note-item">
                        <p>{note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-notes-text">No notes available for this consumer.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab View: ORDERS */}
          {activeTab === 'orders' && (
            <div className="consumer-tab-content-box">
              <h4 className="consumer-card-title">All Consumer Orders</h4>
              <div className="consumer-recent-orders-list" style={{ marginTop: '16px' }}>
                {(consumer.recentOrders || []).map((ord) => (
                  <div key={ord.id} className="consumer-recent-order-item">
                    <div className="recent-order-left">
                      <OrderIconAvatar status={ord.status} size="md" />
                      <div className="recent-order-meta">
                        <span className="recent-order-no">{ord.number}</span>
                        <span className="recent-order-date">{ord.date}</span>
                      </div>
                    </div>

                    <div className="recent-order-right">
                      <StatusBadge status={ord.status} size="sm" />
                      <span className="recent-order-amount">{ord.amount}</span>
                      <ChevronRight size={16} className="recent-order-chevron" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab View: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="consumer-tab-content-box">
              <h4 className="consumer-card-title">Saved Addresses</h4>
              <div className="consumer-addresses-grid">
                {(consumer.addresses || []).map((addr) => (
                  <div key={addr.id} className="consumer-address-card">
                    <div className="addr-header">
                      <span className="addr-type">{addr.type}</span>
                      {addr.isDefault && <span className="addr-default-badge">Default</span>}
                    </div>
                    <p className="addr-text">{addr.line}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab View: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="consumer-tab-content-box">
              <h4 className="consumer-card-title">Activity Log</h4>
              <div className="consumer-activity-list">
                {(consumer.activities || []).map((act) => (
                  <div key={act.id} className="activity-item">
                    <div className="activity-dot" />
                    <div className="activity-info">
                      <span className="activity-text">{act.text}</span>
                      <span className="activity-time">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDetailsModal;
