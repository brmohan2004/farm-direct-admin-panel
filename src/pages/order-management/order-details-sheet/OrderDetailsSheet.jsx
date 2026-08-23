import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Headphones, Printer, User, ChevronRight, Check, Copy } from 'lucide-react';
import { StatusBadge } from '../../../components/ui';
import {
  OrderSheetHeader,
  OrderSheetTimelineTab,
  OrderSheetItemsTab,
  OrderSheetPaymentTab,
} from './components';
import './OrderDetailsSheet.css';

/**
 * OrderDetailsSheet Component
 * Mobile-specific Bottom Sheet / Slide-up view
 */
const OrderDetailsSheet = ({ isOpen = true, onClose, order: propOrder = null }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState(null);

  const mockOrder = propOrder || {
    id: id || '1',
    orderNumber: 'ORD-9821',
    orderDate: '23 Aug 2026',
    fullDateTime: '23 Aug 2026, 09:15 AM',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethodDetail: 'UPI (Google Pay)',
    formattedAmount: '₹1,240',
    itemsCount: 3,
    customer: {
      name: 'Anitha Rajan',
      phone: '+91 98401 23456',
      email: 'anitha.r@gmail.com',
      address: 'Door 42, 5th Avenue, Anna Nagar, Chennai - 600040'
    },
    items: [
      { id: 'item-1', name: 'Organic Fresh Tomatoes', weight: '2 kg', quantity: 1, formattedPrice: '₹120', formattedTotal: '₹240', image: '' },
      { id: 'item-2', name: 'Fresh Farm Spinach', weight: '500 g', quantity: 2, formattedPrice: '₹40', formattedTotal: '₹80', image: '' },
      { id: 'item-3', name: 'Shimla Fresh Apples', weight: '1 kg', quantity: 3, formattedPrice: '₹300', formattedTotal: '₹900', image: '' }
    ],
    summary: {
      subtotal: 1220,
      deliveryCharge: 40,
      discount: 20
    }
  };

  const order = mockOrder;

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

  const handleCopy = (text, fieldName) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="order-sheet-backdrop" onClick={handleClose}>
      <div
        className="order-sheet-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle */}
        <div className="order-sheet-handle-bar">
          <div className="order-sheet-handle" />
        </div>

        {/* Back Navigation Bar */}
        <div className="order-sheet-nav-bar">
          <button className="order-sheet-back-btn" onClick={handleClose}>
            <ArrowLeft size={18} />
            <span>Back to Orders</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="order-sheet-header">
          <div className="order-sheet-header-text">
            <h2 className="order-sheet-title">Order Details</h2>
            <p className="order-sheet-subtitle">View detailed information about this order.</p>
          </div>
          <StatusBadge status={order.status} size="md" />
        </div>

        {/* Sheet Content Scroll Body */}
        <div className="order-sheet-body">
          <OrderSheetHeader order={order} />

          <OrderSheetTimelineTab order={order} />

          <OrderSheetItemsTab order={order} />

          {/* Customer Info Card */}
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

          <OrderSheetPaymentTab order={order} />
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
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSheet;
