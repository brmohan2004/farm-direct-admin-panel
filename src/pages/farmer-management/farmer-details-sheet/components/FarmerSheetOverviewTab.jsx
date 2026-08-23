import React from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  Sprout,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import './FarmerSheetOverviewTab.css';

/**
 * FarmerSheetOverviewTab Component
 * Renders Personal Details, Farm Land Details, and Verification Highlights
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
    farmName: farmer.farmName || 'Green Valley Farms',
    farmSize: farmer.landSize || '5 Acres',
    primaryProducts: farmer.products || 'Vegetables, Fruits',
    farmingType: 'Organic',
    experience: '8 Years',
    registeredOn: farmer.memberSince || '12 May 2024'
  };

  return (
    <div className="farmer-sheet-overview-wrapper">
      {/* 1. Farm Land & Production Details */}
      <div className="farmer-sheet-card">
        <div className="farmer-sheet-card-header">
          <Sprout size={16} className="text-green" />
          <h4 className="farmer-sheet-card-title">Farm Land & Agriculture Info</h4>
        </div>

        <div className="farmer-sheet-grid-2">
          <div className="farmer-sheet-field">
            <span className="field-label">Farm Title</span>
            <span className="field-value font-semibold">{farm.farmName}</span>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Total Land Size</span>
            <span className="field-value highlight-green">{farm.farmSize}</span>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Farming Method</span>
            <span className="field-value">{farm.farmingType} Farming</span>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Experience</span>
            <span className="field-value">{farm.experience}</span>
          </div>

          <div className="farmer-sheet-field full-width">
            <span className="field-label">Cultivated Crops & Products</span>
            <span className="field-value">{farm.primaryProducts}</span>
          </div>
        </div>
      </div>

      {/* 2. Personal Information Card */}
      <div className="farmer-sheet-card">
        <div className="farmer-sheet-card-header">
          <User size={16} className="text-blue" />
          <h4 className="farmer-sheet-card-title">Personal Contact Info</h4>
        </div>

        <div className="farmer-sheet-grid-2">
          <div className="farmer-sheet-field">
            <span className="field-label">Full Name</span>
            <span className="field-value">{personal.fullName}</span>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Mobile Number</span>
            <a href={`tel:${personal.phone}`} className="field-link">
              <Phone size={12} /> {personal.phone}
            </a>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Email Address</span>
            <a href={`mailto:${personal.email}`} className="field-link">
              <Mail size={12} /> {personal.email}
            </a>
          </div>

          <div className="farmer-sheet-field">
            <span className="field-label">Aadhaar Number</span>
            <span className="field-value">{personal.aadhaar}</span>
          </div>

          <div className="farmer-sheet-field full-width">
            <span className="field-label">Registered Address</span>
            <span className="field-value icon-row">
              <MapPin size={13} className="text-muted" />
              {personal.address}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Document Verification Checklist Summary */}
      <div className="farmer-sheet-card">
        <div className="farmer-sheet-card-header flex-between">
          <div className="header-left">
            <Shield size={16} className="text-green" />
            <h4 className="farmer-sheet-card-title">Verification Status</h4>
          </div>
          <button
            type="button"
            className="link-btn"
            onClick={() => onNavigateTab && onNavigateTab('documents')}
          >
            View All Documents <ExternalLink size={12} />
          </button>
        </div>

        <div className="verify-checklist">
          <div className="verify-item">
            <CheckCircle2 size={15} className="text-green" />
            <span>Aadhaar Identity Verification</span>
            <span className="status-tag verified">Verified</span>
          </div>

          <div className="verify-item">
            <CheckCircle2 size={15} className="text-green" />
            <span>PAN Card Identification</span>
            <span className="status-tag verified">Verified</span>
          </div>

          <div className="verify-item">
            <CheckCircle2 size={15} className="text-green" />
            <span>Patta / Chitta Land Record Verification</span>
            <span className="status-tag verified">Verified</span>
          </div>

          <div className="verify-item">
            <CheckCircle2 size={15} className="text-green" />
            <span>Organic Certification Standard</span>
            <span className="status-tag verified">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSheetOverviewTab;
