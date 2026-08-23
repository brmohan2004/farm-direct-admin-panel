import React from 'react';
import { Landmark, CheckCircle2 } from 'lucide-react';
import './FarmerSheetBankTab.css';

/**
 * FarmerSheetBankTab Component
 * Displays verified bank account details & UPI payout information
 */
const FarmerSheetBankTab = ({ farmer }) => {
  const bank = farmer?.bankDetails || {
    holderName: farmer?.name || 'Ramesh Kumar',
    bankName: 'State Bank of India',
    branch: 'Coimbatore Main Branch, Tamil Nadu',
    ifscCode: 'SBIN0001234',
    accountNumber: 'XXXX XXXX 1234',
    accountType: 'Savings Account',
    upiId: 'ramesh.kumar@okicici',
    isVerified: true
  };

  return (
    <div className="farmer-sheet-bank-wrapper">
      <div className="farmer-sheet-bank-card">
        <div className="bank-card-top">
          <div className="bank-icon-box">
            <Landmark size={20} />
          </div>
          <div className="bank-header-titles">
            <h4 className="bank-name">{bank.bankName}</h4>
            <span className="bank-branch">{bank.branch}</span>
          </div>
          <span className="bank-verified-tag">
            <CheckCircle2 size={12} /> Verified
          </span>
        </div>

        <div className="bank-details-grid">
          <div className="bank-field">
            <span className="bank-label">Account Holder</span>
            <span className="bank-val font-semibold">{bank.holderName}</span>
          </div>

          <div className="bank-field">
            <span className="bank-label">Account Number</span>
            <span className="bank-val font-mono">{bank.accountNumber}</span>
          </div>

          <div className="bank-field">
            <span className="bank-label">IFSC Code</span>
            <span className="bank-val font-mono">{bank.ifscCode}</span>
          </div>

          <div className="bank-field">
            <span className="bank-label">Account Type</span>
            <span className="bank-val">{bank.accountType}</span>
          </div>

          <div className="bank-field full-width">
            <span className="bank-label">UPI ID for Instant Payouts</span>
            <span className="bank-val upi-tag">{bank.upiId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSheetBankTab;
