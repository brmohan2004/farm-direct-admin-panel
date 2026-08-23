import React from 'react';
import { CheckCircle, XCircle, MapPin, Package, Calendar, Phone, Mail, Award } from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './StockInboxDetailsModal.css';

/**
 * StockInboxDetailsModal Component
 * Displays complete details for a selected stock request
 */
const StockInboxDetailsModal = ({
  request,
  isOpen = false,
  onClose,
  onApprove,
  onReject
}) => {
  if (!request) return null;

  // Calculate total estimated stock value
  const numQty = parseFloat(request.quantity) || 0;
  const numPrice = parseFloat(request.pricePerKg) || 0;
  const totalValue = (numQty * numPrice).toLocaleString('en-IN');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Stock Request ${request.requestId}`}
      subtitle={`Submitted on ${request.requestedDate} at ${request.requestedTime}`}
      maxWidth="620px"
    >
      <div className="details-modal-wrapper">
        {/* Top Summary Banner */}
        <div className="details-summary-header">
          <div className="details-header-left">
            <span className="details-req-badge">{request.requestId}</span>
            <StatusBadge status={request.status} showDot={false} size="md" />
          </div>
          <div className="details-header-right">
            <span className="details-total-label">Estimated Value</span>
            <span className="details-total-val">₹{totalValue}</span>
          </div>
        </div>

        {/* Section 1: Farmer Info */}
        <div className="details-section-card">
          <h4 className="details-section-title">Farmer Information</h4>
          <div className="farmer-details-row">
            <img src={request.avatar} alt={request.farmerName} className="modal-farmer-avatar" />
            <div className="farmer-modal-meta">
              <span className="modal-farmer-name">{request.farmerName}</span>
              <div className="modal-info-item">
                <MapPin size={14} className="meta-icon" />
                <span>{request.location}</span>
              </div>
              <div className="modal-info-item">
                <Phone size={14} className="meta-icon" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Product & Quantity Breakdown */}
        <div className="details-section-card">
          <h4 className="details-section-title">Stock Product Details</h4>
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

        {/* Action Controls */}
        <div className="details-modal-actions">
          {request.status !== 'Approved' && (
            <button
              type="button"
              className="modal-approve-btn"
              onClick={() => {
                onApprove && onApprove(request);
                onClose && onClose();
              }}
            >
              <CheckCircle size={16} />
              <span>Approve Stock Request</span>
            </button>
          )}

          {request.status !== 'Rejected' && (
            <button
              type="button"
              className="modal-reject-btn"
              onClick={() => {
                onReject && onReject(request);
                onClose && onClose();
              }}
            >
              <XCircle size={16} />
              <span>Reject Request</span>
            </button>
          )}

          <button type="button" className="modal-close-secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StockInboxDetailsModal;
