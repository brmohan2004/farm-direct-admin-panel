import React from 'react';
import { Building2, CheckCircle2, ShieldAlert, CreditCard, User, Landmark, Edit } from 'lucide-react';
import './BankDetailsTab.css';

/**
 * BankDetailsTab Component
 * Renders banking details, account verification status, and payout preferences
 */
const BankDetailsTab = ({ farmer, onEditBank }) => {
  const bank = farmer?.bankDetails || {
    holderName: 'Ramesh Kumar',
    bankName: 'State Bank of India',
    branch: 'Coimbatore Main Branch, TN',
    ifscCode: 'SBIN0001234',
    accountNumber: 'XXXX XXXX 1234',
    rawAccountNumber: '98765432101234',
    accountType: 'Savings Account',
    upiId: 'ramesh.kumar@okicici',
    isVerified: true,
    verifiedOn: '12 May 2024'
  };

  return (
    <div className="bank-details-tab-container">
      <div className="bank-main-card">
        <div className="bank-card-header">
          <div className="header-left">
            <div className="bank-logo-icon">
              <Building2 size={24} />
            </div>
            <div>
              <h3 className="bank-title">{bank.bankName}</h3>
              <span className="bank-subtext">{bank.branch}</span>
            </div>
          </div>

          {bank.isVerified ? (
            <span className="badge-bank-verified">
              <CheckCircle2 size={14} /> Account Verified
            </span>
          ) : (
            <span className="badge-bank-pending">
              <ShieldAlert size={14} /> Verification Pending
            </span>
          )}
        </div>

        <div className="bank-details-grid">
          <div className="bank-item">
            <div className="item-icon-wrapper"><User size={16} /></div>
            <div>
              <span className="item-label">Account Holder Name</span>
              <span className="item-value font-bold">{bank.holderName}</span>
            </div>
          </div>

          <div className="bank-item">
            <div className="item-icon-wrapper"><Landmark size={16} /></div>
            <div>
              <span className="item-label">Bank Name</span>
              <span className="item-value">{bank.bankName}</span>
            </div>
          </div>

          <div className="bank-item">
            <div className="item-icon-wrapper"><CreditCard size={16} /></div>
            <div>
              <span className="item-label">IFSC Code</span>
              <span className="item-value font-mono">{bank.ifscCode}</span>
            </div>
          </div>

          <div className="bank-item">
            <div className="item-icon-wrapper"><CreditCard size={16} /></div>
            <div>
              <span className="item-label">Account Number</span>
              <span className="item-value font-mono">{bank.accountNumber}</span>
            </div>
          </div>

          <div className="bank-item">
            <div className="item-icon-wrapper"><Building2 size={16} /></div>
            <div>
              <span className="item-label">Account Type</span>
              <span className="item-value">{bank.accountType}</span>
            </div>
          </div>

          <div className="bank-item">
            <div className="item-icon-wrapper"><CreditCard size={16} /></div>
            <div>
              <span className="item-label">UPI ID</span>
              <span className="item-value font-mono">{bank.upiId}</span>
            </div>
          </div>
        </div>

        <div className="bank-card-actions">
          <button
            type="button"
            className="btn-edit-bank"
            onClick={onEditBank}
          >
            <Edit size={15} /> Update Bank Account Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsTab;
