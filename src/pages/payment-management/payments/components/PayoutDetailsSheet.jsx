import React, { useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  CreditCard,
  Hash,
  Download,
  FileText,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { StatusBadge, WalletIconAvatar, CopyButton } from '../../../../components/ui';
import './PayoutDetailsSheet.css';

/**
 * PayoutDetailsSheet Component
 * Mobile Bottom Sheet for Farmer Payout Details matching Image 4
 */
const PayoutDetailsSheet = ({ isOpen = false, onClose, payout = null }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !payout) return null;

  return (
    <div className="pwt-sheet-backdrop" onClick={onClose}>
      <div className="pwt-sheet-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Handle Bar */}
        <div className="pwt-sheet-handle-bar">
          <div className="pwt-sheet-handle" />
        </div>

        {/* Back Navigation Bar */}
        <div className="pwt-sheet-nav-bar">
          <button className="pwt-sheet-back-btn" onClick={onClose}>
            <ArrowLeft size={18} />
            <span>Back to Payouts</span>
          </button>
        </div>

        {/* Sheet Content Scroll Body */}
        <div className="pwt-sheet-body">
          {/* Header Title with Badge */}
          <div className="pwt-sheet-header-row">
            <div>
              <h2 className="pwt-sheet-title">Payout Details</h2>
              <p className="pwt-sheet-subtitle">View detailed information about this payout.</p>
            </div>
            <StatusBadge status={payout.status} size="sm" />
          </div>

          {/* Card 1: Payout Top Banner */}
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

          {/* Card 2: Payout Status Step Timeline */}
          <div className="pwt-sheet-card">
            <h4 className="pwt-card-section-title">Payout Status</h4>

            <div className="pwt-timeline-container">
              {(payout.timeline || []).map((step, idx) => (
                <div key={idx} className="pwt-timeline-step">
                  <div className="step-circle-icon done">
                    {step.icon === 'file' && <FileText size={14} />}
                    {step.icon === 'send' && <Send size={14} />}
                    {step.icon === 'bank' && <Building size={14} />}
                    {step.icon === 'check' && <CheckCircle2 size={14} />}
                  </div>
                  <span className="step-title font-semibold">{step.title}</span>
                  <span className="step-time">{step.time}</span>
                  {idx < payout.timeline.length - 1 && <div className="step-line done" />}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Payout Information */}
          <div className="pwt-sheet-card">
            <h4 className="pwt-card-section-title">Payout Information</h4>

            <div className="pwt-info-list">
              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <User size={15} className="pwt-icon-purple" />
                  <span className="pwt-info-lbl">Farmer Name</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val font-semibold">{payout.farmerName}</span>
                  <CopyButton text={payout.farmerName} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <Mail size={15} className="pwt-icon-blue" />
                  <span className="pwt-info-lbl">Email</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val">{payout.farmerEmail}</span>
                  <CopyButton text={payout.farmerEmail} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <Phone size={15} className="pwt-icon-green" />
                  <span className="pwt-info-lbl">Phone</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val">{payout.farmerPhone}</span>
                  <CopyButton text={payout.farmerPhone} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <Building size={15} className="pwt-icon-blue" />
                  <span className="pwt-info-lbl">Bank Name</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val">{payout.bankName}</span>
                  <CopyButton text={payout.bankName} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <CreditCard size={15} className="pwt-icon-purple" />
                  <span className="pwt-info-lbl">Account Number</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val font-mono">{payout.accountNumber}</span>
                  <CopyButton text={payout.accountNumber} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <Hash size={15} className="pwt-icon-blue" />
                  <span className="pwt-info-lbl">IFSC Code</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val font-mono">{payout.ifscCode}</span>
                  <CopyButton text={payout.ifscCode} size={14} />
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <CreditCard size={15} className="pwt-icon-orange" />
                  <span className="pwt-info-lbl">Payout Method</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val">{payout.payoutMethod}</span>
                </div>
              </div>

              <div className="pwt-info-row">
                <div className="pwt-info-left">
                  <Hash size={15} className="pwt-icon-blue" />
                  <span className="pwt-info-lbl">Transaction ID</span>
                </div>
                <div className="pwt-info-right">
                  <span className="pwt-info-val font-mono">{payout.transactionId}</span>
                  <CopyButton text={payout.transactionId} size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Payout Summary */}
          <div className="pwt-sheet-card">
            <h4 className="pwt-card-section-title">Payout Summary</h4>

            <div className="pwt-summary-list">
              <div className="pwt-summary-row">
                <span className="pwt-sum-lbl">Subtotal</span>
                <span className="pwt-sum-val">{payout.subtotal}</span>
              </div>
              <div className="pwt-summary-row">
                <span className="pwt-sum-lbl">Charges</span>
                <span className="pwt-sum-val">{payout.charges}</span>
              </div>
              <div className="pwt-summary-divider" />
              <div className="pwt-summary-row pwt-summary-total font-bold">
                <span className="pwt-sum-lbl">Total Amount</span>
                <span className="pwt-sum-val">{payout.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Download Receipt Button */}
        <div className="pwt-sheet-footer">
          <button className="pwt-btn-download">
            <Download size={16} />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutDetailsSheet;
