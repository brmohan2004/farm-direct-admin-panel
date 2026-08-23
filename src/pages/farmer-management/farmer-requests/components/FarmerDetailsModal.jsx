import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Sprout,
  Calendar,
  ShieldCheck,
  FileText,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Modal from '../../../../components/ui/Modal/Modal';
import StatusBadge from '../../../../components/ui/StatusBadge/StatusBadge';
import './FarmerDetailsModal.css';

/**
 * FarmerDetailsModal Component
 * Full modal preview for farmer verification documents, land details, and registration approval
 */
const FarmerDetailsModal = ({
  farmer = null,
  isOpen = false,
  onClose,
  onApprove,
  onReject
}) => {
  if (!farmer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Farmer Application Details"
      subtitle={`Review registration request for ${farmer.name}`}
      maxWidth="680px"
    >
      <div className="farmer-details-modal-content">
        {/* Profile Card Header */}
        <div className="modal-profile-card">
          <div className="modal-avatar-box">
            {farmer.avatar ? (
              <img src={farmer.avatar} alt={farmer.name} className="modal-avatar-img" />
            ) : (
              <div className="modal-avatar-fallback">
                {farmer.initials || farmer.name?.substring(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="modal-profile-info">
            <div className="profile-title-row">
              <h2 className="profile-farmer-name">{farmer.name}</h2>
              <StatusBadge status={farmer.status} size="md" />
            </div>
            <p className="profile-farm-id">Farm ID: <strong>{farmer.farmId}</strong></p>

            <div className="profile-quick-contacts">
              <span className="contact-pill">
                <Phone size={13} /> {farmer.phone}
              </span>
              <span className="contact-pill">
                <Mail size={13} /> {farmer.email}
              </span>
              <span className="contact-pill">
                <MapPin size={13} /> {farmer.location}
              </span>
            </div>
          </div>
        </div>

        {/* Agricultural Information Grid */}
        <div className="modal-section">
          <h4 className="section-title">
            <Sprout size={16} className="title-icon text-green" /> Agricultural & Farm Overview
          </h4>
          <div className="details-info-grid">
            <div className="info-box">
              <span className="info-label">Crops & Products</span>
              <span className="info-value">{farmer.products}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Total Land Area</span>
              <span className="info-value">{farmer.landSize || '4.5 Acres'}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Irrigation System</span>
              <span className="info-value">{farmer.irrigation || 'Borewell & Drip'}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Requested Date</span>
              <span className="info-value">{farmer.date}</span>
            </div>
          </div>
        </div>

        {/* Verification Documents */}
        <div className="modal-section">
          <h4 className="section-title">
            <ShieldCheck size={16} className="title-icon text-green" /> KYC & Verification Documents
          </h4>
          <div className="documents-list">
            <div className="doc-item">
              <div className="doc-item-left">
                <FileText size={18} className="doc-icon" />
                <div>
                  <span className="doc-name">Aadhaar Card Proof</span>
                  <span className="doc-sub">Uploaded on {farmer.date?.split(',')[0] || '12 May 2024'}</span>
                </div>
              </div>
              <span className="doc-status-verified">
                <CheckCircle2 size={14} /> Verified
              </span>
            </div>

            <div className="doc-item">
              <div className="doc-item-left">
                <FileText size={18} className="doc-icon" />
                <div>
                  <span className="doc-name">Land Chitta / Passbook Document</span>
                  <span className="doc-sub">Survey No: 142/3A</span>
                </div>
              </div>
              <span className="doc-status-verified">
                <CheckCircle2 size={14} /> Verified
              </span>
            </div>

            <div className="doc-item">
              <div className="doc-item-left">
                <CreditCard size={18} className="doc-icon" />
                <div>
                  <span className="doc-name">Bank Account Passbook</span>
                  <span className="doc-sub">State Bank of India (IFSC: SBIN0001234)</span>
                </div>
              </div>
              <span className="doc-status-verified">
                <CheckCircle2 size={14} /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="modal-actions-footer">
          {farmer.status === 'Pending' ? (
            <>
              <button
                type="button"
                className="btn-modal-reject"
                onClick={() => {
                  onReject && onReject(farmer);
                  onClose();
                }}
              >
                <XCircle size={16} />
                <span>Reject Request</span>
              </button>
              <button
                type="button"
                className="btn-modal-approve"
                onClick={() => {
                  onApprove && onApprove(farmer);
                  onClose();
                }}
              >
                <CheckCircle2 size={16} />
                <span>Approve Registration</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn-modal-close"
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FarmerDetailsModal;
