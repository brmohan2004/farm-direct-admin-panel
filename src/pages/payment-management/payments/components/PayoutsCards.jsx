import React from 'react';
import { Wallet, ChevronRight, Calendar, User, Building } from 'lucide-react';
import { StatusBadge, WalletIconAvatar } from '../../../../components/ui';
import './PayoutsCards.css';

/**
 * PayoutsCards Component
 * Mobile stacked cards for Farmer Payouts
 */
const PayoutsCards = ({ payouts, onSelectPayout }) => {
  if (!payouts || payouts.length === 0) {
    return (
      <div className="payouts-cards-empty">
        <Wallet size={32} className="empty-icon" />
        <p>No farmer payouts match your filters.</p>
      </div>
    );
  }

  return (
    <div className="payouts-cards-stack">
      {payouts.map((pwt) => (
        <div
          key={pwt.id}
          className="payout-mobile-card"
          onClick={() => onSelectPayout(pwt)}
        >
          {/* Card Top Row */}
          <div className="pwt-card-header">
            <div className="pwt-card-header-left">
              <WalletIconAvatar type="wallet" variant="success" size="md" />
              <div className="pwt-card-id-info">
                <span className="pwt-card-id">{pwt.payoutId}</span>
                <span className="pwt-card-date">{pwt.date}</span>
              </div>
            </div>

            <div className="pwt-card-header-right">
              <span className="pwt-card-amount">{pwt.amount}</span>
              <StatusBadge status={pwt.status} size="sm" />
            </div>
          </div>

          {/* Divider */}
          <div className="pwt-card-divider" />

          {/* Card Details Grid */}
          <div className="pwt-card-details-grid">
            <div className="pwt-card-detail-item">
              <User size={13} className="detail-icon" />
              <span className="detail-text">{pwt.farmerName}</span>
            </div>

            <div className="pwt-card-detail-item">
              <Building size={13} className="detail-icon" />
              <span className="detail-text">{pwt.bankName}</span>
            </div>
          </div>

          {/* Footer View arrow */}
          <div className="pwt-card-footer">
            <span className="view-link-text">Tap to view payout details</span>
            <ChevronRight size={16} className="arrow-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayoutsCards;
