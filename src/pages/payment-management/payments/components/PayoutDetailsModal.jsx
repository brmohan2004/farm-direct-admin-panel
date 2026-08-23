import React from 'react';
import {
  X,
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
import './PayoutDetailsModal.css';

/**
 * PayoutDetailsModal Component
 * Popup modal for Desktop & Tablet view matching Image 3
 */
const PayoutDetailsModal = ({ isOpen = false, onClose, payout = null }) => {
  if (!isOpen || !payout) return null;

  return (
    <div className="pwt-modal-overlay" onClick={onClose}>
      <div className="pwt-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pwt-modal-header">
          <div className="pwt-modal-header-text">
            <h2 className="pwt-modal-title">Payout Details</h2>
            <p className="pwt-modal-subtitle">View detailed information about this payout.</p>
          </div>

          <div className="pwt-modal-header-actions">
            <button className="pwt-back-link-btn" onClick={onClose}>
              <ArrowLeft size={16} />
              <span>Back to Payouts</span>
            </button>
            <StatusBadge status={payout.status} size="sm" />
            <button className="pwt-modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Body */}
        <div className="pwt-modal-body">
          <div className="pwt-modal-grid-layout">
            {/* Left 2/3 Main Column */}
            <div className="pwt-modal-left-col">
              {/* Top Banner Card */}
              <div className="pwt-banner-card">
                <div className="pwt-banner-left">
                  <WalletIconAvatar type="wallet" variant="success" size="lg" />
                  <div className="pwt-banner-meta">
                    <span className="lbl-xs">Payout ID</span>
                    <div className="pwt-id-row font-bold">
                      <h3>{payout.payoutId}</h3>
                      <CopyButton text={payout.payoutId} size={14} />
                    </div>
                    <span className="pwt-banner-date">{payout.date}</span>
                  </div>
                </div>

                <div className="pwt-banner-right">
                  <span className="lbl-xs">Amount</span>
                  <span className="pwt-banner-amount-val">{payout.amount}</span>
                </div>
              </div>

              {/* Payout Status Timeline Card */}
              <div className="pwt-modal-card">
                <h4 className="pwt-modal-card-title">Payout Status</h4>

                <div className="pwt-horizontal-timeline">
                  {(payout.timeline || []).map((step, idx) => (
                    <div key={idx} className="pwt-step-item">
                      <div className="pwt-step-icon-wrap done">
                        {step.icon === 'file' && <FileText size={16} />}
                        {step.icon === 'send' && <Send size={16} />}
                        {step.icon === 'bank' && <Building size={16} />}
                        {step.icon === 'check' && <CheckCircle2 size={16} />}
                      </div>
                      <span className="pwt-step-title font-semibold">{step.title}</span>
                      <span className="pwt-step-time">{step.time}</span>
                      {idx < payout.timeline.length - 1 && <div className="pwt-step-line done" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout Information Card */}
              <div className="pwt-modal-card">
                <h4 className="pwt-modal-card-title">Payout Information</h4>

                <div className="pwt-info-grid-2col">
                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <User size={15} className="pwt-icon-purple" />
                      <span>Farmer Name</span>
                    </div>
                    <div className="item-val-row">
                      <span className="font-semibold">{payout.farmerName}</span>
                      <CopyButton text={payout.farmerName} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <CreditCard size={15} className="pwt-icon-purple" />
                      <span>Account Number</span>
                    </div>
                    <div className="item-val-row">
                      <span className="font-mono">{payout.accountNumber}</span>
                      <CopyButton text={payout.accountNumber} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <Mail size={15} className="pwt-icon-blue" />
                      <span>Email</span>
                    </div>
                    <div className="item-val-row">
                      <span>{payout.farmerEmail}</span>
                      <CopyButton text={payout.farmerEmail} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <Hash size={15} className="pwt-icon-blue" />
                      <span>IFSC Code</span>
                    </div>
                    <div className="item-val-row">
                      <span className="font-mono">{payout.ifscCode}</span>
                      <CopyButton text={payout.ifscCode} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <Phone size={15} className="pwt-icon-green" />
                      <span>Phone</span>
                    </div>
                    <div className="item-val-row">
                      <span>{payout.farmerPhone}</span>
                      <CopyButton text={payout.farmerPhone} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <CreditCard size={15} className="pwt-icon-orange" />
                      <span>Payout Method</span>
                    </div>
                    <div className="item-val-row">
                      <span>{payout.payoutMethod}</span>
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <Building size={15} className="pwt-icon-blue" />
                      <span>Bank Name</span>
                    </div>
                    <div className="item-val-row">
                      <span>{payout.bankName}</span>
                      <CopyButton text={payout.bankName} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <div className="item-lbl-row">
                      <Hash size={15} className="pwt-icon-blue" />
                      <span>Transaction ID</span>
                    </div>
                    <div className="item-val-row">
                      <span className="font-mono">{payout.transactionId}</span>
                      <CopyButton text={payout.transactionId} size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Card */}
              <div className="pwt-modal-card">
                <h4 className="pwt-modal-card-title">Additional Information</h4>

                <div className="pwt-info-grid-2col">
                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Payout Date & Time</span>
                    <span className="val-dark">{payout.date}</span>
                  </div>

                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Reference ID</span>
                    <div className="item-val-row">
                      <span className="val-dark font-mono">{payout.referenceId}</span>
                      <CopyButton text={payout.referenceId} size={14} />
                    </div>
                  </div>

                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Initiated By</span>
                    <span className="val-dark">{payout.initiatedBy}</span>
                  </div>

                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Remark</span>
                    <span className="val-dark">{payout.remark}</span>
                  </div>

                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Note</span>
                    <span className="val-dark">{payout.note}</span>
                  </div>

                  <div className="pwt-info-grid-item">
                    <span className="lbl-muted">Last Updated</span>
                    <span className="val-dark">{payout.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1/3 Sidebar Column */}
            <div className="pwt-modal-right-col">
              {/* Payout Summary Card */}
              <div className="pwt-modal-card">
                <h4 className="pwt-modal-card-title">Payout Summary</h4>

                <div className="pwt-summary-body">
                  <div className="summary-line">
                    <span className="lbl">Subtotal</span>
                    <span className="val">{payout.subtotal}</span>
                  </div>
                  <div className="summary-line">
                    <span className="lbl">Charges</span>
                    <span className="val">{payout.charges}</span>
                  </div>
                  <div className="summary-line-divider" />
                  <div className="summary-line summary-total font-bold">
                    <span className="lbl-total">Total Amount</span>
                    <span className="val-total">{payout.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Download Receipt Card */}
              <div className="pwt-modal-card download-card-box">
                <button className="pwt-download-btn-lg">
                  <Download size={18} />
                  <span>Download Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutDetailsModal;
