import React from 'react';
import { CreditCard, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../../../components/ui';
import './OrderSheetPaymentTab.css';

const OrderSheetPaymentTab = ({ order }) => {
  if (!order) return null;

  return (
    <>
      {/* Payment Summary Card */}
      <div className="order-sheet-card">
        <div className="order-sheet-title-with-icon">
          <div className="sheet-icon-badge sheet-icon-badge--blue">
            <CreditCard size={16} />
          </div>
          <h4 className="order-sheet-section-title">Payment Summary</h4>
        </div>

        <div className="order-sheet-payment-rows">
          <div className="order-sheet-pay-row">
            <span>Subtotal</span>
            <span>₹{(order.summary?.subtotal || 1180).toFixed(2)}</span>
          </div>
          <div className="order-sheet-pay-row">
            <span>Delivery Charge</span>
            <span>₹{(order.summary?.deliveryCharge || 50).toFixed(2)}</span>
          </div>
          <div className="order-sheet-pay-row order-sheet-pay-row--discount">
            <span>Discount</span>
            <span>-₹{Math.abs(order.summary?.discount || 100).toFixed(2)}</span>
          </div>

          <div className="order-sheet-pay-divider" />

          <div className="order-sheet-pay-row order-sheet-pay-row--total">
            <span>Total Amount</span>
            <span>{order.formattedAmount}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="order-sheet-card">
        <div className="order-sheet-card-header">
          <div className="order-sheet-title-with-icon">
            <div className="sheet-icon-badge sheet-icon-badge--blue">
              <CreditCard size={16} />
            </div>
            <div className="order-sheet-pay-method-meta">
              <h4 className="order-sheet-section-title">Payment Method</h4>
              <span className="pay-method-subtext">{order.paymentMethodDetail || 'UPI (Google Pay)'}</span>
            </div>
          </div>

          <div className="order-sheet-pay-method-right">
            <StatusBadge status={order.paymentStatus || 'Paid'} size="sm" showDot={false} />
            <ChevronRight size={18} className="sheet-chevron" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSheetPaymentTab;
