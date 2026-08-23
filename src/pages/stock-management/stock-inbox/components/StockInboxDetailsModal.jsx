import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, MapPin, Phone } from 'lucide-react';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './StockInboxDetailsModal.css';

/**
 * StockInboxDetailsModal / Sheet Component
 * Responsive bottom sheet with gesture-driven 55vh/96vh expansion & drag-to-dismiss mechanics.
 */
const StockInboxDetailsModal = ({
  request,
  isOpen = false,
  onClose,
  onApprove,
  onReject
}) => {
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

  if (!isOpen || !request) return null;

  // Calculate total estimated stock value
  const numQty = parseFloat(request.quantity) || 0;
  const numPrice = parseFloat(request.pricePerKg) || 0;
  const totalValue = (numQty * numPrice).toLocaleString('en-IN');

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

  return (
    <div className="stock-sheet-backdrop" onClick={onClose}>
      <div
        className={`stock-sheet-container ${isExpanded ? 'expanded' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Mobile Drag Handle */}
        <div
          className="stock-sheet-handle-bar"
          onClick={() => setIsExpanded((prev) => !prev)}
          role="button"
          aria-label="Toggle sheet height"
        >
          <div className="stock-sheet-handle" />
        </div>

        {/* Sheet Content Scroll Area */}
        <div
          className="stock-sheet-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
          {/* Summary Banner */}
          <div className="stock-sheet-card stock-sheet-summary-banner">
            <div className="summary-left">
              <span className="summary-lbl">Request Status</span>
              <StatusBadge status={request.status} showDot={false} size="md" />
            </div>
            <div className="summary-right">
              <span className="summary-lbl">Estimated Total Value</span>
              <span className="summary-val-green">₹{totalValue}</span>
            </div>
          </div>

          {/* Section 1: Farmer Info */}
          <div className="stock-sheet-card">
            <h4 className="stock-sheet-card-title">Farmer Information</h4>
            <div className="farmer-details-row">
              <img src={request.avatar} alt={request.farmerName} className="modal-farmer-avatar" />
              <div className="farmer-modal-meta">
                <span className="modal-farmer-name">{request.farmerName}</span>
                <div className="modal-info-item">
                  <MapPin size={13} className="meta-icon" />
                  <span>{request.location}</span>
                </div>
                <div className="modal-info-item">
                  <Phone size={13} className="meta-icon" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Stock Product Details */}
          <div className="stock-sheet-card">
            <h4 className="stock-sheet-card-title">Stock Product Details</h4>
            <div className="product-details-modal-grid">
              <img src={request.productImage} alt={request.productName} className="modal-product-img" />
              <div className="product-modal-info">
                <span className="modal-product-title">{request.productName}</span>
                <span className="modal-product-cat">Category: <strong>{request.category}</strong></span>
                
                <div className="product-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-lbl">Offered Quantity</span>
                    <span className="metric-val">{request.quantity}</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-lbl">Price / kg</span>
                    <span className="metric-val green-text">₹{request.pricePerKg}</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-lbl">Quality Grade</span>
                    <span className="metric-val">Grade A (Inspected)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Info Card */}
          <div className="stock-sheet-card">
            <div className="stock-sheet-field-row">
              <span className="field-lbl">Submitted On</span>
              <span className="field-val">{request.requestedDate} at {request.requestedTime}</span>
            </div>
          </div>
        </div>

        {/* Action Footer Bar */}
        <div className="stock-sheet-footer">
          {request.status !== 'Approved' && (
            <button
              type="button"
              className="stock-btn-approve"
              onClick={() => {
                onApprove && onApprove(request);
                onClose && onClose();
              }}
            >
              <CheckCircle size={16} />
              <span>Approve Request</span>
            </button>
          )}

          {request.status !== 'Rejected' && (
            <button
              type="button"
              className="stock-btn-reject"
              onClick={() => {
                onReject && onReject(request);
                onClose && onClose();
              }}
            >
              <XCircle size={16} />
              <span>Reject Request</span>
            </button>
          )}

          <button
            type="button"
            className="stock-btn-close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockInboxDetailsModal;
