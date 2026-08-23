import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Headphones,
  Printer,
  User,
  CreditCard,
  ChevronRight,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './OrderDetailsSheet.css';

/**
 * OrderDetailsSheet Component
 * Mobile-specific Bottom Sheet / Slide-up view with expandable scroll/drag behavior
 */
const OrderDetailsSheet = ({ isOpen = false, onClose, order = null }) => {
  const [copiedField, setCopiedField] = useState(null);
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

  if (!isOpen || !order) return null;

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    if (currentScrollTop > 15 && !isExpanded) {
      setIsExpanded(true);
    } else if (currentScrollTop <= 2 && isExpanded && currentScrollTop < lastScrollTop.current) {
      setIsExpanded(false);
    }
    lastScrollTop.current = currentScrollTop;
  };

  const handleWheel = (e) => {
    const bodyScrollTop = bodyRef.current ? bodyRef.current.scrollTop : 0;
    if (e.deltaY > 0 && !isExpanded) {
      setIsExpanded(true);
    } else if (e.deltaY < 0 && bodyScrollTop <= 2 && isExpanded) {
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

    if (deltaY < -20 && !isExpanded) {
      setIsExpanded(true);
    } else if (deltaY > 30 && bodyScrollTop <= 5) {
      if (isExpanded) {
        setIsExpanded(false);
        touchStartY.current = touchY;
      } else {
        if (onClose) onClose();
      }
    }
  };

  const handleCopy = (text, fieldName) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const timelineSteps = order.timeline || [
    { step: 'Order Placed', time: order.orderDate + ', 09:15 AM', completed: true },
    { step: 'Confirmed', time: order.orderDate + ', 09:20 AM', completed: true },
    { step: 'Shipped', time: order.orderDate + ', 04:30 PM', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { step: 'Delivered', time: order.orderDate + ', 06:10 PM', completed: order.status === 'Delivered' },
  ];

  return (
    <div className="order-sheet-backdrop" onClick={onClose}>
      <div
        className={`order-sheet-container ${isExpanded ? 'expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Top Handle / Drag bar */}
        <div
          className="order-sheet-handle-bar"
          onClick={() => setIsExpanded((prev) => !prev)}
          role="button"
          aria-label="Toggle sheet height"
        >
          <div className="order-sheet-handle" />
        </div>

        {/* Sheet Content Scroll Body */}
        <div
          className="order-sheet-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
          {/* Order Header Summary Card */}
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

          {/* Order Status Timeline Card */}
          <div className="order-sheet-card">
            <h4 className="order-sheet-section-title">Order Status</h4>
            <div className="order-sheet-timeline">
              {timelineSteps.map((step, idx) => {
                const isCompleted = step.completed;
                return (
                  <div key={idx} className={`order-sheet-timeline-node ${isCompleted ? 'order-sheet-timeline-node--completed' : ''}`}>
                    <div className="order-sheet-node-icon">
                      {idx === 0 && <ShoppingBag size={14} />}
                      {idx === 1 && <Package size={14} />}
                      {idx === 2 && <Truck size={14} />}
                      {idx === 3 && <CheckCircle size={14} />}
                    </div>
                    <span className="order-sheet-node-label">{step.step}</span>
                    <span className="order-sheet-node-time">{step.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items Card */}
          <div className="order-sheet-card">
            <div className="order-sheet-card-header">
              <h4 className="order-sheet-section-title">
                Order Items ({order.items ? order.items.length : order.itemsCount})
              </h4>
              <button className="order-sheet-link-btn">View All Items</button>
            </div>

            <div className="order-sheet-items-list">
              {(order.items || []).slice(0, 3).map((item) => (
                <div key={item.id} className="order-sheet-item-row">
                  <img src={item.image} alt={item.name} className="order-sheet-item-img" />
                  <div className="order-sheet-item-details">
                    <span className="order-sheet-item-name">{item.name}</span>
                    <span className="order-sheet-item-weight">{item.weight}</span>
                    <span className="order-sheet-item-unit-price">{item.formattedPrice}</span>
                  </div>
                  <div className="order-sheet-item-right">
                    <span className="order-sheet-item-qty">Qty: {item.quantity}</span>
                    <span className="order-sheet-item-total">{item.formattedTotal}</span>
                  </div>
                </div>
              ))}
            </div>

            {(order.items || []).length > 3 && (
              <div className="order-sheet-more-items">
                +{(order.items.length - 3)} more items
              </div>
            )}
          </div>

          {/* Customer Information Card */}
          <div className="order-sheet-card">
            <div className="order-sheet-card-header">
              <div className="order-sheet-title-with-icon">
                <div className="sheet-icon-badge sheet-icon-badge--purple">
                  <User size={16} />
                </div>
                <h4 className="order-sheet-section-title">Customer Information</h4>
              </div>
              <ChevronRight size={18} className="sheet-chevron" />
            </div>

            <div className="order-sheet-customer-info">
              <span className="customer-name-bold">{order.customer.name}</span>
              <div className="customer-info-line">
                <span className="customer-info-val">{order.customer.phone}</span>
                <button
                  className="order-sheet-copy-btn"
                  onClick={() => handleCopy(order.customer.phone, 'custPhone')}
                >
                  {copiedField === 'custPhone' ? <Check size={13} className="copied-icon" /> : <Copy size={13} />}
                </button>
              </div>
              <div className="customer-info-line">
                <span className="customer-info-val">{order.customer.email}</span>
              </div>
              <div className="customer-info-line">
                <span className="customer-info-val customer-address">{order.customer.address}</span>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="order-sheet-card">
            <div className="order-sheet-title-with-icon">
              <div className="sheet-icon-badge sheet-icon-badge--blue">
                <CreditCard size={16} />
              </div>
              <h4 className="order-sheet-section-title">Payment Summary</h4>
            </div>

            <div className="order-sheet-payment-rows">
              <div className="order-sheet-pay-row">
                <span>Subtotal</span>
                <span>₹{(order.summary?.subtotal || 1180).toFixed(2)}</span>
              </div>
              <div className="order-sheet-pay-row">
                <span>Delivery Charge</span>
                <span>₹{(order.summary?.deliveryCharge || 50).toFixed(2)}</span>
              </div>
              <div className="order-sheet-pay-row order-sheet-pay-row--discount">
                <span>Discount</span>
                <span>-₹{Math.abs(order.summary?.discount || 100).toFixed(2)}</span>
              </div>

              <div className="order-sheet-pay-divider" />

              <div className="order-sheet-pay-row order-sheet-pay-row--total">
                <span>Total Amount</span>
                <span>{order.formattedAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="order-sheet-card">
            <div className="order-sheet-card-header">
              <div className="order-sheet-title-with-icon">
                <div className="sheet-icon-badge sheet-icon-badge--blue">
                  <CreditCard size={16} />
                </div>
                <div className="order-sheet-pay-method-meta">
                  <h4 className="order-sheet-section-title">Payment Method</h4>
                  <span className="pay-method-subtext">{order.paymentMethodDetail || 'UPI (Google Pay)'}</span>
                </div>
              </div>

              <div className="order-sheet-pay-method-right">
                <StatusBadge status={order.paymentStatus || 'Paid'} size="sm" showDot={false} />
                <ChevronRight size={18} className="sheet-chevron" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Buttons */}
        <div className="order-sheet-bottom-actions">
          <button
            className="order-sheet-action-btn order-sheet-action-btn--outline"
            onClick={() => alert(`Contacting customer ${order.customer.name}`)}
          >
            <Headphones size={16} />
            <span>Contact Customer</span>
          </button>

          <button
            className="order-sheet-action-btn order-sheet-action-btn--primary"
            onClick={() => alert(`Downloading Invoice for order ${order.orderNumber}`)}
          >
            <Printer size={16} />
            <span>Download Invoice</span>
          </button>

          <button
            type="button"
            className="order-sheet-action-btn order-sheet-action-btn--close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSheet;
