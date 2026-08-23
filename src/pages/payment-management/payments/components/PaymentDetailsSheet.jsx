import React, { useEffect, useState, useRef } from 'react';
import {
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
import { StatusBadge, WalletIconAvatar, CopyButton } from '../../../../components/ui';
import './PaymentDetailsSheet.css';

/**
 * PaymentDetailsSheet Component
 * Mobile-specific Bottom Sheet for Payment Details with expandable drag/scroll behavior
 */
const PaymentDetailsSheet = ({ isOpen = false, onClose, payment = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const touchStartY = useRef(0);
  const lastScrollTop = useRef(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsExpanded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !payment) return null;

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;

    // Scrolling down into content -> Expand to full screen
    if (currentScrollTop > 15 && !isExpanded) {
      setIsExpanded(true);
    }
    // Scrolling upward back to the top -> Shrink back to partial screen
    else if (currentScrollTop <= 2 && isExpanded && currentScrollTop < lastScrollTop.current) {
      setIsExpanded(false);
    }

    lastScrollTop.current = currentScrollTop;
  };

  const handleWheel = (e) => {
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;
    // Mouse wheel scrolling DOWN into content
    if (e.deltaY > 0 && !isExpanded) {
      setIsExpanded(true);
    }
    // Mouse wheel scrolling UP at top of content
    else if (e.deltaY < 0 && bodyScrollTop <= 2 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;

    // Swiping UP -> Scrolling down into content
    if (deltaY < -20 && !isExpanded) {
      setIsExpanded(true);
    }
    // Swiping DOWN -> Scrolling up / pulling sheet down
    else if (deltaY > 30 && bodyScrollTop <= 5) {
      if (isExpanded) {
        setIsExpanded(false);
        touchStartY.current = touchY;
      } else {
        onClose();
      }
    }
  };

  const handleHandleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="pay-sheet-backdrop" onClick={onClose}>
      <div
        className={`pay-sheet-container ${isExpanded ? 'expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Drag Handle */}
        <div
          className="pay-sheet-handle-bar"
          onClick={handleHandleClick}
          role="button"
          aria-label="Toggle sheet height"
        >
          <div className="pay-sheet-handle" />
        </div>

        {/* Sheet Body Scroll Area */}
        <div
          className="pay-sheet-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
          {/* Card 1: Top Order Card */}
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
          <button className="pay-sheet-btn-refund">
            <RotateCcw size={16} />
            <span>Refund Payment</span>
          </button>
          <button className="pay-sheet-btn-invoice">
            <Download size={16} />
            <span>Download Invoice</span>
          </button>
          <button type="button" className="pay-sheet-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsSheet;
