import React, { useState } from 'react';
import {
  X,
  Headphones,
  Printer,
  Copy,
  Check,
  User,
  CreditCard,
  Info,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
} from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './OrderDetailsModal.css';

/**
 * OrderDetailsModal Component
 * Popup modal for Desktop and Tablet screens matching design Image 4
 */
const OrderDetailsModal = ({ isOpen = false, onClose, order = null }) => {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !order) return null;

  const handleCopy = (text, fieldName) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const timelineSteps = order.timeline || [
    { step: 'Order Placed', time: order.orderDate + ', ' + order.orderTime, completed: true },
    { step: 'Confirmed', time: order.orderDate + ', 09:20 AM', completed: true },
    { step: 'Shipped', time: order.orderDate + ', 04:30 PM', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { step: 'Delivered', time: order.orderDate + ', 06:10 PM', completed: order.status === 'Delivered' },
  ];

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div
        className="order-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="order-modal-header">
          <div className="order-modal-header-titles">
            <h2 className="order-modal-title">Order Details</h2>
            <p className="order-modal-subtitle">View detailed information about this order.</p>
          </div>

          <div className="order-modal-header-actions">
            <button
              className="order-modal-btn order-modal-btn--outline"
              onClick={() => alert(`Contacting customer ${order.customer.name} at ${order.customer.phone}`)}
            >
              <Headphones size={16} />
              <span>Contact Customer</span>
            </button>

            <button
              className="order-modal-btn order-modal-btn--primary"
              onClick={() => alert(`Downloading Invoice for order ${order.orderNumber}`)}
            >
              <Printer size={16} />
              <span>Download Invoice</span>
            </button>

            <button
              className="order-modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body Grid */}
        <div className="order-modal-body">
          {/* Left Column */}
          <div className="order-modal-left-col">
            {/* Top Order Summary Card */}
            <div className="order-card-box order-summary-header-card">
              <div className="order-summary-header-left">
                <OrderIconAvatar status={order.status} size="lg" />
                <div className="order-summary-header-meta">
                  <div className="order-number-row">
                    <span className="order-summary-number">Order {order.orderNumber}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.orderNumber, 'orderNumber')}
                      title="Copy Order ID"
                    >
                      {copiedField === 'orderNumber' ? <Check size={14} className="copied-text-icon" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <span className="order-summary-date">{order.fullDateTime}</span>
                  <div className="order-summary-status-badge">
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                </div>
              </div>

              <div className="order-summary-header-right">
                <span className="total-amount-label">Total Amount</span>
                <span className="total-amount-value">{order.formattedAmount}</span>
              </div>
            </div>

            {/* Order Status Timeline Card */}
            <div className="order-card-box order-status-timeline-card">
              <h4 className="order-card-section-title">Order Status</h4>

              <div className="order-timeline-stepper">
                {timelineSteps.map((step, idx) => {
                  const isCompleted = step.completed;
                  const isCancelled = step.isCancelled;

                  return (
                    <div key={idx} className={`order-timeline-node ${isCompleted ? 'order-timeline-node--completed' : ''}`}>
                      <div className="order-timeline-icon-wrap">
                        {idx === 0 && <ShoppingBag size={16} />}
                        {idx === 1 && <Package size={16} />}
                        {idx === 2 && <Truck size={16} />}
                        {idx === 3 && <CheckCircle size={16} />}
                      </div>
                      <div className="order-timeline-content">
                        <span className="order-timeline-label">{step.step}</span>
                        <span className="order-timeline-time">{step.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items Table Card */}
            <div className="order-card-box order-items-card">
              <div className="order-card-section-header">
                <h4 className="order-card-section-title">
                  Order Items ({order.items ? order.items.length : order.itemsCount})
                </h4>
                <button className="order-view-all-link">View All Items</button>
              </div>

              <div className="order-items-table-wrapper">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Details</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="order-items-th-total">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).slice(0, 4).map((item) => (
                      <tr key={item.id}>
                        <td className="order-items-td-item">
                          <div className="order-item-cell">
                            <img src={item.image} alt={item.name} className="order-item-thumb" />
                            <span className="order-item-name">{item.name}</span>
                          </div>
                        </td>
                        <td className="order-items-td-details">{item.weight}</td>
                        <td className="order-items-td-price">{item.formattedPrice}</td>
                        <td className="order-items-td-qty">{item.quantity}</td>
                        <td className="order-items-td-total">{item.formattedTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(order.items || []).length > 4 && (
                <div className="order-items-footer-more">
                  +{(order.items.length - 4)} more items
                </div>
              )}
            </div>

            {/* Order Additional Information Card */}
            <div className="order-card-box order-additional-info-card">
              <div className="order-card-section-header">
                <div className="order-card-section-title-wrap">
                  <Info size={18} className="section-title-icon section-title-icon--orange" />
                  <h4 className="order-card-section-title">Order Additional Information</h4>
                </div>
              </div>

              <div className="order-additional-info-grid">
                <div className="info-grid-item">
                  <span className="info-grid-label">Order ID</span>
                  <div className="info-grid-val-wrap">
                    <span className="info-grid-val">{order.orderNumber}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.orderNumber, 'addOrderNumber')}
                    >
                      {copiedField === 'addOrderNumber' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="info-grid-item">
                  <span className="info-grid-label">Delivery Date</span>
                  <span className="info-grid-val">{order.deliveryDate || '10 May 2024, 06:10 PM'}</span>
                </div>

                <div className="info-grid-item">
                  <span className="info-grid-label">Order Date</span>
                  <span className="info-grid-val">{order.fullDateTime}</span>
                </div>

                <div className="info-grid-item">
                  <span className="info-grid-label">Delivery Partner</span>
                  <span className="info-grid-val">{order.deliveryPartner || 'Ekart Logistics'}</span>
                </div>

                <div className="info-grid-item">
                  <span className="info-grid-label">Order Status</span>
                  <div className="info-grid-val">
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                </div>

                <div className="info-grid-item">
                  <span className="info-grid-label">Tracking ID</span>
                  <div className="info-grid-val-wrap">
                    <span className="info-grid-val">{order.trackingId || 'EK123456789IN'}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.trackingId || 'EK123456789IN', 'trackingId')}
                    >
                      {copiedField === 'trackingId' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="order-modal-right-col">
            {/* Customer Information Card */}
            <div className="order-card-box order-customer-info-card">
              <div className="order-card-section-header">
                <div className="order-card-section-title-wrap">
                  <div className="order-card-header-icon-badge order-card-header-icon-badge--purple">
                    <User size={16} />
                  </div>
                  <h4 className="order-card-section-title">Customer Information</h4>
                </div>
              </div>

              <div className="order-customer-details-list">
                <div className="order-customer-field">
                  <span className="order-field-label">Customer Name</span>
                  <div className="order-field-value-wrap">
                    <span className="order-field-val-bold">{order.customer.name}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.customer.name, 'customerName')}
                    >
                      {copiedField === 'customerName' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="order-customer-field">
                  <span className="order-field-label">Phone</span>
                  <div className="order-field-value-wrap">
                    <span className="order-field-val">{order.customer.phone}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.customer.phone, 'customerPhone')}
                    >
                      {copiedField === 'customerPhone' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="order-customer-field">
                  <span className="order-field-label">Email</span>
                  <div className="order-field-value-wrap">
                    <span className="order-field-val">{order.customer.email}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.customer.email, 'customerEmail')}
                    >
                      {copiedField === 'customerEmail' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                <div className="order-customer-field">
                  <span className="order-field-label">Address</span>
                  <div className="order-field-value-wrap">
                    <span className="order-field-val order-address-text">{order.customer.address}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.customer.address, 'customerAddress')}
                    >
                      {copiedField === 'customerAddress' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary Card */}
            <div className="order-card-box order-payment-summary-card">
              <div className="order-card-section-header">
                <div className="order-card-section-title-wrap">
                  <div className="order-card-header-icon-badge order-card-header-icon-badge--blue">
                    <CreditCard size={16} />
                  </div>
                  <h4 className="order-card-section-title">Payment Summary</h4>
                </div>
              </div>

              <div className="order-payment-rows">
                <div className="order-payment-row">
                  <span>Subtotal</span>
                  <span>₹{(order.summary?.subtotal || 1180).toFixed(2)}</span>
                </div>
                <div className="order-payment-row">
                  <span>Delivery Charge</span>
                  <span>₹{(order.summary?.deliveryCharge || 50).toFixed(2)}</span>
                </div>
                <div className="order-payment-row order-payment-row--discount">
                  <span>Discount</span>
                  <span>-₹{Math.abs(order.summary?.discount || 100).toFixed(2)}</span>
                </div>

                <div className="order-payment-divider" />

                <div className="order-payment-row order-payment-row--total">
                  <span>Total Amount</span>
                  <span>{order.formattedAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="order-card-box order-payment-method-card">
              <div className="order-card-section-header">
                <div className="order-card-section-title-wrap">
                  <div className="order-card-header-icon-badge order-card-header-icon-badge--blue">
                    <CreditCard size={16} />
                  </div>
                  <h4 className="order-card-section-title">Payment Method</h4>
                </div>
              </div>

              <div className="order-payment-method-details">
                <div className="order-customer-field">
                  <span className="order-field-label">Method</span>
                  <span className="order-field-val-bold">{order.paymentMethodDetail || 'UPI (Google Pay)'}</span>
                </div>

                <div className="order-customer-field">
                  <span className="order-field-label">Payment Status</span>
                  <StatusBadge status={order.paymentStatus || 'Paid'} size="sm" showDot={false} />
                </div>

                <div className="order-customer-field">
                  <span className="order-field-label">Transaction ID</span>
                  <div className="order-field-value-wrap">
                    <span className="order-field-val">{order.transactionId || 'pay_8x7Yt6hJkL2m'}</span>
                    <button
                      className="order-copy-icon-btn"
                      onClick={() => handleCopy(order.transactionId || 'pay_8x7Yt6hJkL2m', 'transactionId')}
                    >
                      {copiedField === 'transactionId' ? <Check size={13} className="copied-text-icon" /> : <Copy size={13} />}
                    </button>
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

export default OrderDetailsModal;
