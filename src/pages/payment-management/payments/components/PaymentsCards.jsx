import React from 'react';
import { CreditCard, ChevronRight, Calendar, User } from 'lucide-react';
import { StatusBadge, WalletIconAvatar } from '../../../../components/ui';
import './PaymentsCards.css';

/**
 * PaymentsCards Component
 * Mobile-friendly stack of payment cards
 */
const PaymentsCards = ({ payments, onSelectPayment }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="payments-cards-empty">
        <CreditCard size={32} className="empty-icon" />
        <p>No payments match your filters.</p>
      </div>
    );
  }

  return (
    <div className="payments-cards-stack">
      {payments.map((pay) => (
        <div
          key={pay.id}
          className="payment-mobile-card"
          onClick={() => onSelectPayment(pay)}
        >
          {/* Card Top Row */}
          <div className="pay-card-header">
            <div className="pay-card-header-left">
              <WalletIconAvatar type="wallet" variant="success" size="md" />
              <div className="pay-card-order-info">
                <span className="pay-card-order-no">{pay.orderId}</span>
                <span className="pay-card-txn">{pay.transactionId}</span>
              </div>
            </div>

            <div className="pay-card-header-right">
              <span className="pay-card-amount">{pay.amount}</span>
              <StatusBadge status={pay.status} size="sm" />
            </div>
          </div>

          {/* Divider */}
          <div className="pay-card-divider" />

          {/* Card Details Grid */}
          <div className="pay-card-details-grid">
            <div className="pay-card-detail-item">
              <User size={13} className="detail-icon" />
              <span className="detail-text">{pay.customerName}</span>
            </div>

            <div className="pay-card-detail-item">
              <CreditCard size={13} className="detail-icon" />
              <span className="detail-text">{pay.paymentMethod}</span>
            </div>

            <div className="pay-card-detail-item span-full">
              <Calendar size={13} className="detail-icon" />
              <span className="detail-text">{pay.date}</span>
            </div>
          </div>

          {/* Footer view arrow */}
          <div className="pay-card-footer">
            <span className="view-link-text">Tap to view full details</span>
            <ChevronRight size={16} className="arrow-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsCards;
