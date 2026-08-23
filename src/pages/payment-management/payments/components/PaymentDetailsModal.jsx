import React from 'react';
import {
  X,
  RotateCcw,
  Download,
  User,
  CreditCard,
  Tag,
  Circle,
  Hash,
  FileText,
  CheckCircle2,
  ChevronRight,
  Info,
  Calendar,
  Bookmark,
} from 'lucide-react';
import { StatusBadge, WalletIconAvatar, CopyButton } from '../../../../components/ui';
import './PaymentDetailsModal.css';

/**
 * PaymentDetailsModal Component
 * Popup modal for Desktop and Tablet screens matching Image 2
 */
const PaymentDetailsModal = ({ isOpen = false, onClose, payment = null }) => {
  if (!isOpen || !payment) return null;

  return (
    <div className="pay-modal-overlay" onClick={onClose}>
      <div className="pay-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="pay-modal-header">
          <div className="pay-modal-header-text">
            <h2 className="pay-modal-title">Payment Details</h2>
            <p className="pay-modal-subtitle">View detailed information about this transaction.</p>
          </div>

          <div className="pay-modal-header-actions">
            <button className="pay-modal-btn-refund">
              <RotateCcw size={15} />
              <span>Refund Payment</span>
            </button>
            <button className="pay-modal-btn-invoice">
              <Download size={15} />
              <span>Download Invoice</span>
            </button>
            <button className="pay-modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="pay-modal-body">
          {/* Top Banner Box */}
          <div className="pay-modal-banner-card">
            <div className="banner-top-row">
              <div className="banner-title-box">
                <WalletIconAvatar type="wallet" variant="success" size="lg" />
                <div className="banner-title-meta">
                  <h3 className="banner-order-title">Order {payment.orderId}</h3>
                  <span className="banner-txn-sub">{payment.transactionId}</span>
                  <div style={{ marginTop: '4px' }}>
                    <StatusBadge status={payment.status} size="sm" />
                  </div>
                </div>
              </div>

              <div className="banner-amount-box">
                <span className="banner-amount-label">Total Paid</span>
                <span className="banner-amount-value">{payment.amount}</span>
              </div>
            </div>

            <div className="banner-divider" />

            {/* 4-Column Banner Detail Grid */}
            <div className="banner-details-grid">
              <div className="banner-col">
                <div className="banner-field">
                  <div className="banner-field-header">
                    <User size={14} className="banner-icon" />
                    <span>Customer</span>
                  </div>
                  <span className="banner-val font-semibold">{payment.customerName}</span>
                </div>

                <div className="banner-field">
                  <div className="banner-field-header">
                    <Calendar size={14} className="banner-icon" />
                    <span>Date & Time</span>
                  </div>
                  <span className="banner-val">{payment.date}</span>
                </div>
              </div>

              <div className="banner-col">
                <div className="banner-field">
                  <div className="banner-field-header">
                    <CreditCard size={14} className="banner-icon" />
                    <span>Payment Method</span>
                  </div>
                  <span className="banner-val">{payment.paymentMethod}</span>
                </div>

                <div className="banner-field">
                  <div className="banner-field-header">
                    <Tag size={14} className="banner-icon" />
                    <span>Payment ID</span>
                  </div>
                  <span className="banner-val font-mono">{payment.paymentId}</span>
                </div>
              </div>

              <div className="banner-col">
                <div className="banner-field">
                  <div className="banner-field-header">
                    <Bookmark size={14} className="banner-icon" />
                    <span>Status</span>
                  </div>
                  <div style={{ marginTop: '2px' }}>
                    <StatusBadge status={payment.status} size="sm" />
                  </div>
                </div>

                <div className="banner-field">
                  <div className="banner-field-header">
                    <Circle size={14} className="banner-icon" />
                    <span>Currency</span>
                  </div>
                  <span className="banner-val">{payment.currency}</span>
                </div>
              </div>

              <div className="banner-col">
                <div className="banner-field">
                  <div className="banner-field-header">
                    <Hash size={14} className="banner-icon" />
                    <span>Gateway Transaction ID</span>
                  </div>
                  <span className="banner-val font-mono">{payment.gatewayTxnId}</span>
                </div>

                <div className="banner-field">
                  <div className="banner-field-header">
                    <FileText size={14} className="banner-icon" />
                    <span>Description</span>
                  </div>
                  <span className="banner-val">{payment.description}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle 3-Column Section */}
          <div className="pay-modal-middle-grid">
            {/* Card 1: Payment Summary */}
            <div className="pay-modal-card">
              <div className="pay-modal-card-header">
                <WalletIconAvatar type="credit-card" variant="purple" size="sm" />
                <h4 className="pay-modal-card-title">Payment Summary</h4>
              </div>

              <div className="modal-summary-rows">
                <div className="summary-row">
                  <span className="lbl">Subtotal</span>
                  <span className="val">{payment.subtotal}</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Delivery Charge</span>
                  <span className="val">{payment.deliveryCharge}</span>
                </div>
                <div className="summary-row text-green">
                  <span className="lbl">Discount</span>
                  <span className="val font-bold">{payment.discount}</span>
                </div>
                <div className="summary-row-divider" />
                <div className="summary-row summary-total">
                  <span className="total-label">Total Amount</span>
                  <span className="total-value">{payment.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Order Information */}
            <div className="pay-modal-card">
              <div className="pay-modal-card-header">
                <WalletIconAvatar type="wallet" variant="info" size="sm" />
                <h4 className="pay-modal-card-title">Order Information</h4>
              </div>

              <div className="modal-field-list">
                <div className="modal-field-row">
                  <span className="lbl">Order ID</span>
                  <div className="val-wrap">
                    <span className="val text-green font-bold">{payment.orderId}</span>
                    <CopyButton text={payment.orderId} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Order Date</span>
                  <div className="val-wrap">
                    <span className="val">{payment.orderDate}</span>
                    <CopyButton text={payment.orderDate} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Order Status</span>
                  <div className="val-wrap">
                    <StatusBadge status={payment.orderStatus} size="sm" />
                    <CopyButton text={payment.orderStatus} size={14} />
                  </div>
                </div>

                <button className="modal-view-order-btn">
                  <span>View Order Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Card 3: Customer Information */}
            <div className="pay-modal-card">
              <div className="pay-modal-card-header">
                <WalletIconAvatar type="wallet" variant="orange" size="sm" />
                <h4 className="pay-modal-card-title">Customer Information</h4>
              </div>

              <div className="modal-field-list">
                <div className="modal-field-row">
                  <span className="lbl">Name</span>
                  <div className="val-wrap">
                    <span className="val font-semibold">{payment.customerName}</span>
                    <CopyButton text={payment.customerName} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Email</span>
                  <div className="val-wrap">
                    <span className="val">{payment.customerEmail}</span>
                    <CopyButton text={payment.customerEmail} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Phone</span>
                  <div className="val-wrap">
                    <span className="val">{payment.customerPhone}</span>
                    <CopyButton text={payment.customerPhone} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Address</span>
                  <div className="val-wrap">
                    <span className="val text-right-address">{payment.customerAddress}</span>
                    <CopyButton text={payment.customerAddress} size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 2-Column Section */}
          <div className="pay-modal-bottom-grid">
            {/* Card 1: Transaction Timeline */}
            <div className="pay-modal-card flex-2">
              <h4 className="pay-modal-card-title" style={{ marginBottom: '14px' }}>Transaction Timeline</h4>
              
              <div className="txn-timeline-list">
                {(payment.timeline || []).map((step, idx) => (
                  <div key={step.id || idx} className="timeline-item">
                    <div className="timeline-left">
                      <div className={`timeline-check-circle ${step.completed ? 'completed' : ''}`}>
                        <CheckCircle2 size={16} />
                      </div>
                      {idx < payment.timeline.length - 1 && <div className="timeline-line" />}
                    </div>

                    <div className="timeline-right">
                      <div className="timeline-title-row">
                        <span className="timeline-step-title font-bold">{step.title}</span>
                        <span className="timeline-step-time">{step.time}</span>
                      </div>
                      <p className="timeline-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Additional Information */}
            <div className="pay-modal-card flex-1">
              <div className="pay-modal-card-header">
                <Info size={16} className="text-muted" />
                <h4 className="pay-modal-card-title">Additional Information</h4>
              </div>

              <div className="modal-field-list">
                <div className="modal-field-row">
                  <span className="lbl">Refund Status</span>
                  <StatusBadge status={payment.refundStatus} size="sm" />
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Refund Amount</span>
                  <span className="val">{payment.refundAmount}</span>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Invoice Number</span>
                  <div className="val-wrap">
                    <span className="val font-mono">{payment.invoiceNumber}</span>
                    <CopyButton text={payment.invoiceNumber} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Invoice Date</span>
                  <div className="val-wrap">
                    <span className="val">{payment.invoiceDate}</span>
                    <CopyButton text={payment.invoiceDate} size={14} />
                  </div>
                </div>

                <div className="modal-field-row">
                  <span className="lbl">Notes</span>
                  <div className="val-wrap">
                    <span className="val">{payment.notes}</span>
                    <CopyButton text={payment.notes} size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
