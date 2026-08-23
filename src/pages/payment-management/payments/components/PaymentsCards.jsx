import React from 'react';
import { CreditCard, ChevronRight, ArrowUpRight } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui';
import './PaymentsCards.css';

/**
 * PaymentsCards Component
 * Minimalist mobile cards for Customer Payments
 */
const PaymentsCards = ({ payments, onSelectPayment }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="payments-cards-empty">
        <CreditCard size={28} className="empty-icon" />
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
          {/* Top Row: Order ID + Customer Name on left | Amount + Status on right */}
          <div className="pay-card-top">
            <div className="pay-card-main-info">
              <div className="pay-card-icon-badge">
                <ArrowUpRight size={15} />
              </div>
              <div className="pay-card-titles">
                <span className="pay-card-order-id">{pay.orderId}</span>
                <span className="pay-card-customer">{pay.customerName}</span>
              </div>
            </div>

            <div className="pay-card-amount-block">
              <span className="pay-card-amount">{pay.amount}</span>
              <StatusBadge status={pay.status} size="sm" />
            </div>
          </div>

          {/* Bottom Meta Row */}
          <div className="pay-card-bottom">
            <div className="pay-card-meta">
              <span className="pay-meta-method">{pay.paymentMethod}</span>
              <span className="pay-meta-bullet">•</span>
              <span className="pay-meta-date">{pay.date}</span>
            </div>
            <ChevronRight size={16} className="pay-card-arrow" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentsCards;
