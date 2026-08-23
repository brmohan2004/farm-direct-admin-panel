import React from 'react';
import { WalletIconAvatar } from '../../../../components/ui';
import './PaymentSheetHeader.css';

const PaymentSheetHeader = ({ payment }) => {
  if (!payment) return null;

  return (
    <div className="pay-sheet-card pay-sheet-order-top-card">
      <div className="pay-sheet-order-left">
        <WalletIconAvatar type="wallet" variant="success" size="md" />
        <div className="pay-sheet-order-text">
          <h3 className="pay-sheet-order-no">Order {payment.orderId}</h3>
          <span className="pay-sheet-txn-no">{payment.transactionId}</span>
        </div>
      </div>
      <div className="pay-sheet-order-right">
        <span className="pay-sheet-main-amount">{payment.amount}</span>
      </div>
    </div>
  );
};

export default PaymentSheetHeader;
