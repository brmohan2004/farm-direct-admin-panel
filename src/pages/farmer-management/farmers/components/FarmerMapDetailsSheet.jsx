import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Sprout,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import './FarmerMapDetailsSheet.css';

/**
 * FarmerMapDetailsSheet Component
 * Responsive bottom sheet (mobile) and popup modal (desktop) for displaying
 * full farmer land & profile details when clicking a farmer card on the map view.
 */
const FarmerMapDetailsSheet = ({ isOpen, onClose, farmer }) => {
  const navigate = useNavigate();

  // Prevent background scrolling when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !farmer) return null;

  const handleViewFullProfile = () => {
    onClose();
    navigate(`/farmer-management/farmer-details/${farmer.id}`);
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <div className="farmer-map-sheet-backdrop" onClick={onClose} />

      {/* Sheet Container */}
      <div className="farmer-map-sheet-container" role="dialog" aria-modal="true">
        {/* Drag handle for mobile */}
        <div className="farmer-map-sheet-drag-handle" />

        {/* Sheet Header */}
        <div className="farmer-map-sheet-header">
          <div className="farmer-map-sheet-title-group">
            <span className="farmer-map-sheet-badge">
              <CheckCircle2 size={13} /> Verified Approved Farmer
            </span>
            <h2 className="farmer-map-sheet-title">Farmer Land Profile</h2>
          </div>
          <button
            type="button"
            className="farmer-map-sheet-close-btn"
            onClick={onClose}
            aria-label="Close sheet"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sheet Content Body */}
        <div className="farmer-map-sheet-body">
          {/* Main Farmer Profile Card */}
          <div className="farmer-map-profile-card">
            <div className="farmer-map-avatar-wrapper">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="farmer-map-avatar-img"
              />
              <span className="farmer-map-verified-icon">
                <CheckCircle2 size={12} />
              </span>
            </div>

            <div className="farmer-map-profile-info">
              <h3 className="farmer-map-name">{farmer.name}</h3>
              <p className="farmer-map-farm-title">{farmer.farmName}</p>
              <div className="farmer-map-location-tag">
                <MapPin size={13} />
                <span>{farmer.location}</span>
              </div>
            </div>

            <span className="farmer-map-id-badge">ID: {farmer.id}</span>
          </div>

          {/* Quick Stats Grid */}
          <div className="farmer-map-stats-grid">
            <div className="farmer-map-stat-box">
              <span className="farmer-map-stat-label">Land Size</span>
              <span className="farmer-map-stat-val">{farmer.landSize || '5.2 Acres'}</span>
            </div>
            <div className="farmer-map-stat-box">
              <span className="farmer-map-stat-label">Irrigation</span>
              <span className="farmer-map-stat-val">{farmer.irrigation || 'Drip System'}</span>
            </div>
            <div className="farmer-map-stat-box">
              <span className="farmer-map-stat-label">Orders Settled</span>
              <span className="farmer-map-stat-val">{farmer.ordersCompleted || 142}</span>
            </div>
            <div className="farmer-map-stat-box">
              <span className="farmer-map-stat-label">Rating</span>
              <span className="farmer-map-stat-val highlight-gold">★ {farmer.rating || 4.9}</span>
            </div>
          </div>

          {/* Farm Land & Crop Information */}
          <div className="farmer-map-section">
            <h4 className="farmer-map-section-title">
              <Sprout size={15} /> Farm Land & Cultivated Crops
            </h4>
            <div className="farmer-map-crops-box">
              <div className="farmer-map-plot-tag">
                <Layers size={13} />
                <span>{farmer.plotArea || 'Plot A - Agricultural Sector'}</span>
              </div>
              <p className="farmer-map-crops-desc">
                Primary Produce: <strong>{farmer.products}</strong>
              </p>
              {farmer.crops && farmer.crops.length > 0 && (
                <div className="farmer-map-crop-pills">
                  {farmer.crops.map((crop, idx) => (
                    <span key={idx} className="farmer-map-crop-pill">
                      🌿 {crop}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Verification Checks */}
          <div className="farmer-map-section">
            <h4 className="farmer-map-section-title">
              <ShieldCheck size={15} /> Verified Verifications
            </h4>
            <div className="farmer-map-verifications-list">
              <div className="farmer-map-verify-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Aadhaar Identity Verified</span>
              </div>
              <div className="farmer-map-verify-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Patta / Chitta Land Ownership Verified</span>
              </div>
              <div className="farmer-map-verify-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Farm Direct Organic Certification</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="farmer-map-section">
            <h4 className="farmer-map-section-title">Contact Information</h4>
            <div className="farmer-map-contact-list">
              <a href={`tel:${farmer.phone}`} className="farmer-map-contact-row">
                <Phone size={14} />
                <span>{farmer.phone}</span>
              </a>
              <a href={`mailto:${farmer.email}`} className="farmer-map-contact-row">
                <Mail size={14} />
                <span>{farmer.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sheet Footer Action Bar */}
        <div className="farmer-map-sheet-footer">
          <a
            href={`tel:${farmer.phone}`}
            className="farmer-map-btn-secondary"
          >
            <Phone size={15} /> Call Farmer
          </a>
          <button
            type="button"
            className="farmer-map-btn-primary"
            onClick={handleViewFullProfile}
          >
            View Full Profile <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FarmerMapDetailsSheet;
