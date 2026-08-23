import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './OrderSheetHeader.css';

const OrderSheetHeader = ({ order }) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!order) return null;

  const handleCopy = (text, fieldName) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="order-sheet-card order-sheet-summary-card">
      <div className="order-sheet-summary-left">
        <OrderIconAvatar status={order.status} size="lg" />
        <div className="order-sheet-summary-info">
          <div className="order-sheet-ord-row">
            <span className="order-sheet-ord-title">Order {order.orderNumber}</span>
            <button
              className="order-sheet-copy-btn"
              onClick={() => handleCopy(order.orderNumber, 'ordNo')}
            >
              {copiedField === 'ordNo' ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
            </button>
          </div>
          <span className="order-sheet-ord-date">{order.fullDateTime}</span>
        </div>
      </div>

      <div className="order-sheet-summary-right">
        <span className="order-sheet-amount-label">Total Amount</span>
        <span className="order-sheet-amount-val">{order.formattedAmount}</span>
      </div>
    </div>
  );
};

export default OrderSheetHeader;
