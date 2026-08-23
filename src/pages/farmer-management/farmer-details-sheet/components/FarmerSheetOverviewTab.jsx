import React from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import './FarmerSheetOverviewTab.css';

/**
 * FarmerSheetOverviewTab Component
 * Minimalist, sleek design for farmer profile details
 */
const FarmerSheetOverviewTab = ({ farmer, onNavigateTab }) => {
  if (!farmer) return null;

  const personal = farmer.personalInfo || {
    fullName: farmer.name,
    phone: farmer.phone,
    email: farmer.email,
    address: farmer.location,
    aadhaar: 'XXXX XXXX 3210'
  };

  const farm = farmer.farmInfo || {
    farmName: farmer.farmName || 'Green Valley Organic Farms',
    farmSize: farmer.landSize || '5.2 Acres',
    primaryProducts: farmer.products || 'Organic Vegetables, Fruits',
    farmingType: 'Organic',
    experience: '8 Years',
    registeredOn: farmer.memberSince || '12 May 2024'
  };

  return (
    <div className="minimal-overview-container">
      {/* Section 1: Farm & Agriculture Details */}
      <div className="minimal-section">
        <div className="section-header-minimal">
          <Sprout size={16} className="icon-green-minimal" />
          <h4 className="section-title-minimal">Farm & Crop Info</h4>
        </div>

        <div className="minimal-grid">
          <div className="minimal-item">
            <span className="minimal-label">Farm Title</span>
            <span className="minimal-value font-bold">{farm.farmName}</span>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Land Size</span>
            <span className="minimal-value text-green font-bold">{farm.farmSize}</span>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Farming Method</span>
            <span className="minimal-value">{farm.farmingType} Farming</span>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Experience</span>
            <span className="minimal-value">{farm.experience}</span>
          </div>

          <div className="minimal-item full-width">
            <span className="minimal-label">Cultivated Crops</span>
            <span className="minimal-value">{farm.primaryProducts}</span>
          </div>
        </div>
      </div>

      <div className="minimal-divider" />

      {/* Section 2: Contact Information */}
      <div className="minimal-section">
        <div className="section-header-minimal">
          <User size={16} className="icon-slate-minimal" />
          <h4 className="section-title-minimal">Personal Contact</h4>
        </div>

        <div className="minimal-grid">
          <div className="minimal-item">
            <span className="minimal-label">Full Name</span>
            <span className="minimal-value font-bold">{personal.fullName}</span>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Phone</span>
            <a href={`tel:${personal.phone}`} className="minimal-link">
              <Phone size={12} /> {personal.phone}
            </a>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Email</span>
            <a href={`mailto:${personal.email}`} className="minimal-link">
              <Mail size={12} /> {personal.email}
            </a>
          </div>

          <div className="minimal-item">
            <span className="minimal-label">Aadhaar</span>
            <span className="minimal-value">{personal.aadhaar}</span>
          </div>

          <div className="minimal-item full-width">
            <span className="minimal-label">Address</span>
            <div className="minimal-address">
              <MapPin size={13} className="icon-muted" />
              <span>{personal.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="minimal-divider" />

      {/* Section 3: Verification Highlights */}
      <div className="minimal-section">
        <div className="section-header-minimal flex-between">
          <div className="header-left-minimal">
            <ShieldCheck size={16} className="icon-green-minimal" />
            <h4 className="section-title-minimal">Verification Status</h4>
          </div>
          {onNavigateTab && (
            <button
              type="button"
              className="minimal-link-btn"
              onClick={() => onNavigateTab('documents')}
            >
              View Docs <ExternalLink size={11} />
            </button>
          )}
        </div>

        <div className="minimal-verify-list">
          <div className="minimal-verify-row">
            <span className="verify-text">
              <CheckCircle2 size={14} className="icon-green-minimal" /> Aadhaar Verification
            </span>
            <span className="verify-pill">Verified</span>
          </div>

          <div className="minimal-verify-row">
            <span className="verify-text">
              <CheckCircle2 size={14} className="icon-green-minimal" /> PAN Card Record
            </span>
            <span className="verify-pill">Verified</span>
          </div>

          <div className="minimal-verify-row">
            <span className="verify-text">
              <CheckCircle2 size={14} className="icon-green-minimal" /> Patta / Chitta Land Proof
            </span>
            <span className="verify-pill">Verified</span>
          </div>

          <div className="minimal-verify-row">
            <span className="verify-text">
              <CheckCircle2 size={14} className="icon-green-minimal" /> Organic Standards Certificate
            </span>
            <span className="verify-pill">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSheetOverviewTab;
