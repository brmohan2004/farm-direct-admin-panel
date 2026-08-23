import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Calendar,
  CreditCard,
  Tag,
  Circle,
  RotateCcw,
  Download,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import { StatusBadge, WalletIconAvatar, CopyButton } from '../../../components/ui';
import { PaymentSheetHeader } from './components';
import './PaymentDetailsSheet.css';

/**
 * PaymentDetailsSheet Component
 * Mobile Bottom Sheet / Modal Popup for Payment Details
 */
const PaymentDetailsSheet = ({ isOpen = true, onClose, payment: propPayment = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mockPayment = propPayment || {
    id: id || 'PAY-8821',
    transactionId: 'TXN-90812348',
    orderId: 'ORD-9821',
    amount: '₹1,240',
    status: 'Completed',
    customerName: 'Anitha Rajan',
    customerEmail: 'anitha.r@gmail.com',
    customerPhone: '+91 98401 23456',
    date: '23 Aug 2026, 09:15 AM',
    paymentMethod: 'UPI (Google Pay)',
    paymentId: 'pay_NmK8723kL',
    currency: 'INR (₹)',
    subtotal: '₹1,220',
    deliveryCharge: '₹40',
    discount: '-₹20',
    totalAmount: '₹1,240',
    orderDate: '23 Aug 2026',
    orderStatus: 'Delivered'
  };

  const payment = mockPayment;

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

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  if (!isOpen || !payment) return null;

  return (
    <div className="pay-sheet-backdrop" onClick={handleClose}>
      <div className="pay-sheet-container" onClick={(e) => e.stopPropagation()}>
        {/* Drag Handle */}
        <div className="pay-sheet-handle-bar">
          <div className="pay-sheet-handle" />
        </div>

        {/* Back Navigation Bar */}
        <div className="pay-sheet-nav-bar">
          <button className="pay-sheet-back-btn" onClick={handleClose}>
            <ArrowLeft size={18} />
            <span>Back to Payments</span>
          </button>
        </div>

        {/* Sheet Content Scroll Area */}
        <div className="pay-sheet-body">
          {/* Header section with Badge */}
          <div className="pay-sheet-header-row">
            <div>
              <h2 className="pay-sheet-title">Payment Details</h2>
              <p className="pay-sheet-subtitle">View detailed information about this transaction.</p>
            </div>
            <StatusBadge status={payment.status} size="sm" />
          </div>

          <PaymentSheetHeader payment={payment} />

          {/* 2-Column Details Grid */}
          <div className="pay-sheet-card pay-sheet-grid-card">
            <div className="pay-sheet-info-col">
              <div className="pay-sheet-info-item">
                <User size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Customer</span>
                  <span className="info-val font-semibold">{payment.customerName}</span>
                </div>
              </div>

              <div className="pay-sheet-info-item">
                <Calendar size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Date & Time</span>
                  <span className="info-val">{payment.date}</span>
                </div>
              </div>

              <div className="pay-sheet-info-item">
                <Bookmark size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Status</span>
                  <div style={{ marginTop: '2px' }}>
                    <StatusBadge status={payment.status} size="sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pay-sheet-info-col">
              <div className="pay-sheet-info-item">
                <CreditCard size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Payment Method</span>
                  <span className="info-val">{payment.paymentMethod}</span>
                </div>
              </div>

              <div className="pay-sheet-info-item">
                <Tag size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Payment ID</span>
                  <span className="info-val font-mono">{payment.paymentId}</span>
                </div>
              </div>

              <div className="pay-sheet-info-item">
                <Circle size={15} className="info-icon" />
                <div className="info-text-box">
                  <span className="info-lbl">Currency</span>
                  <span className="info-val">{payment.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Payment Summary */}
          <div className="pay-sheet-card">
            <div className="pay-sheet-card-title-row">
              <WalletIconAvatar type="credit-card" variant="purple" size="sm" />
              <h4 className="pay-sheet-card-title">Payment Summary</h4>
            </div>

            <div className="pay-summary-rows">
              <div className="pay-summary-row">
                <span className="summary-lbl">Subtotal</span>
                <span className="summary-val">{payment.subtotal}</span>
              </div>
              <div className="pay-summary-row">
                <span className="summary-lbl">Delivery Charge</span>
                <span className="summary-val">{payment.deliveryCharge}</span>
              </div>
              <div className="pay-summary-row text-green">
                <span className="summary-lbl">Discount</span>
                <span className="summary-val font-bold">{payment.discount}</span>
              </div>
              <div className="pay-summary-divider" />
              <div className="pay-summary-row pay-summary-total">
                <span className="total-lbl">Total Amount</span>
                <span className="total-val">{payment.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Order Information */}
          <div className="pay-sheet-card">
            <div className="pay-sheet-card-title-row">
              <WalletIconAvatar type="wallet" variant="info" size="sm" />
              <h4 className="pay-sheet-card-title">Order Information</h4>
            </div>

            <div className="pay-sheet-field-list">
              <div className="pay-sheet-field-row">
                <span className="field-lbl">Order ID</span>
                <div className="field-val-wrap">
                  <span className="field-val text-green font-bold">{payment.orderId}</span>
                  <CopyButton text={payment.orderId} size={14} />
                </div>
              </div>

              <div className="pay-sheet-field-row">
                <span className="field-lbl">Order Date</span>
                <div className="field-val-wrap">
                  <span className="field-val">{payment.orderDate}</span>
                  <CopyButton text={payment.orderDate} size={14} />
                </div>
              </div>

              <div className="pay-sheet-field-row">
                <span className="field-lbl">Order Status</span>
                <div className="field-val-wrap">
                  <StatusBadge status={payment.orderStatus} size="sm" />
                  <CopyButton text={payment.orderStatus} size={14} />
                </div>
              </div>

              <button className="view-order-details-link-btn">
                <span>View Order Details</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 4: Customer Information */}
          <div className="pay-sheet-card">
            <div className="pay-sheet-card-title-row">
              <WalletIconAvatar type="wallet" variant="orange" size="sm" />
              <h4 className="pay-sheet-card-title">Customer Information</h4>
            </div>

            <div className="pay-sheet-field-list">
              <div className="pay-sheet-field-row">
                <span className="field-lbl">Name</span>
                <div className="field-val-wrap">
                  <span className="field-val font-semibold">{payment.customerName}</span>
                  <CopyButton text={payment.customerName} size={14} />
                </div>
              </div>

              <div className="pay-sheet-field-row">
                <span className="field-lbl">Email</span>
                <div className="field-val-wrap">
                  <span className="field-val">{payment.customerEmail}</span>
                  <CopyButton text={payment.customerEmail} size={14} />
                </div>
              </div>

              <div className="pay-sheet-field-row">
                <span className="field-lbl">Phone</span>
                <div className="field-val-wrap">
                  <span className="field-val">{payment.customerPhone}</span>
                  <CopyButton text={payment.customerPhone} size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Footer Bar */}
        <div className="pay-sheet-footer">
          <button className="pay-sheet-btn-refund" onClick={() => alert(`Initiating refund for ${payment.orderId}`)}>
            <RotateCcw size={16} />
            <span>Refund Payment</span>
          </button>
          <button className="pay-sheet-btn-invoice" onClick={() => alert(`Downloading invoice for ${payment.orderId}`)}>
            <Download size={16} />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsSheet;
