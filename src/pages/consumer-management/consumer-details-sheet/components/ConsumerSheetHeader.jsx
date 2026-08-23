import React from 'react';
import { Phone, Mail, MapPin, ShoppingBag, IndianRupee, Calendar, Clock, MoreVertical } from 'lucide-react';
import { StatusBadge, UserAvatar } from '../../../../components/ui';
import './ConsumerSheetHeader.css';

/**
 * ConsumerSheetHeader Component
 * Profile header summary banner inside Consumer Details Sheet
 */
const ConsumerSheetHeader = ({ consumer }) => {
  if (!consumer) return null;

  return (
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

      {/* 4 Metric Badges Row */}
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
          <span className="sheet-metric-val">{consumer.lastOrderTimeAgo || '2h ago'}</span>
          <span className="sheet-metric-lbl">Last Order</span>
        </div>
      </div>
    </div>
  );
};

export default ConsumerSheetHeader;
