import React from 'react';
import { Wallet, ChevronRight, ArrowDownLeft } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui';
import './PayoutsCards.css';

/**
 * PayoutsCards Component
 * Minimalist mobile cards for Farmer Payouts
 */
const PayoutsCards = ({ payouts, onSelectPayout }) => {
  if (!payouts || payouts.length === 0) {
    return (
      <div className="payouts-cards-empty">
        <Wallet size={28} className="empty-icon" />
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
          {/* Top Row: Payout ID + Farmer Name on left | Amount + Status on right */}
          <div className="pwt-card-top">
            <div className="pwt-card-main-info">
              <div className="pwt-card-icon-badge">
                <ArrowDownLeft size={15} />
              </div>
              <div className="pwt-card-titles">
                <span className="pwt-card-id">{pwt.payoutId}</span>
                <span className="pwt-card-farmer">{pwt.farmerName}</span>
              </div>
            </div>

            <div className="pwt-card-amount-block">
              <span className="pwt-card-amount">{pwt.amount}</span>
              <StatusBadge status={pwt.status} size="sm" />
            </div>
          </div>

          {/* Bottom Meta Row */}
          <div className="pwt-card-bottom">
            <div className="pwt-card-meta">
              <span className="pwt-meta-bank">{pwt.bankName}</span>
              <span className="pwt-meta-bullet">•</span>
              <span className="pwt-meta-date">{pwt.date}</span>
            </div>
            <ChevronRight size={16} className="pwt-card-arrow" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayoutsCards;
