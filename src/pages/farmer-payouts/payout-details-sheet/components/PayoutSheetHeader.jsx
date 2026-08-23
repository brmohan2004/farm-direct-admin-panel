import React from 'react';
import { WalletIconAvatar, CopyButton } from '../../../../components/ui';
import './PayoutSheetHeader.css';

const PayoutSheetHeader = ({ payout }) => {
  if (!payout) return null;

  return (
    <div className="pwt-sheet-card pwt-sheet-top-card">
      <div className="pwt-top-left">
        <WalletIconAvatar type="wallet" variant="success" size="md" />
        <div className="pwt-top-meta">
          <div className="pwt-id-row">
            <span className="pwt-lbl-sm">Payout ID</span>
          </div>
          <div className="pwt-id-copy-row">
            <h3 className="pwt-id font-bold">{payout.payoutId}</h3>
            <CopyButton text={payout.payoutId} size={14} />
          </div>
          <span className="pwt-date">{payout.date}</span>
        </div>
      </div>

      <div className="pwt-top-right">
        <span className="pwt-amount-lbl">Amount</span>
        <span className="pwt-amount-val">{payout.amount}</span>
      </div>
    </div>
  );
};

export default PayoutSheetHeader;
