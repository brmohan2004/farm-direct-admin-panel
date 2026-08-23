import React, { useState } from 'react';
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Eye,
  EyeOff,
  Download,
  Home,
  Ruler,
  Sprout,
  Leaf,
  Award,
  Edit,
  Trash2,
  Building,
  CheckCircle2,
  ShoppingCart,
  PackageCheck,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import './OverviewTab.css';

/**
 * OverviewTab Component
 * Renders overview section including Personal Information, Documents, Farm Information, Bank Details, and Recent Activity cards
 */
const OverviewTab = ({
  farmer,
  onEdit,
  onRemove,
  onViewDocument,
  onViewBankDetails,
  onNavigateTab
}) => {
  const [showAadhaar, setShowAadhaar] = useState(false);

  const personalInfo = farmer?.personalInfo || {
    fullName: 'Ramesh Kumar',
    dob: '15 Aug 1985',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    address: '123, Green Valley Road, Coimbatore - 641001, Tamil Nadu, India',
    aadhaar: 'XXXX XXXX 3210',
    rawAadhaar: '9876 5432 3210'
  };

  const farmInfo = farmer?.farmInfo || {
    farmName: 'Green Valley Farms',
    farmSize: '5 Acres',
    primaryProducts: 'Vegetables, Fruits',
    farmingType: 'Organic',
    experience: '8 Years',
    registeredOn: '12 May 2024'
  };

  const documents = farmer?.documents || [
    { id: 'doc-1', name: 'Aadhaar Card', status: 'Verified', type: 'aadhaar' },
    { id: 'doc-2', name: 'PAN Card', status: 'Verified', type: 'pan' },
    { id: 'doc-3', name: 'Farm Photo', status: 'Verified', type: 'photo' },
    { id: 'doc-4', name: 'Land Ownership Proof', status: 'Pending', type: 'land' },
    { id: 'doc-5', name: 'Organic Certificate', status: 'Pending', type: 'certificate' }
  ];

  const bankDetails = farmer?.bankDetails || {
    holderName: 'Ramesh Kumar',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    accountNumber: 'XXXX XXXX 1234',
    accountType: 'Savings Account',
    isVerified: true
  };

  const activities = farmer?.activities || [
    {
      id: 'act-1',
      title: 'Order #ORD12345 delivered',
      time: '20 May 2024, 10:30 AM',
      type: 'order',
      colorClass: 'icon-bg-green'
    },
    {
      id: 'act-2',
      title: 'Stock request #SR1234 approved',
      time: '18 May 2024, 03:15 PM',
      type: 'stock',
      colorClass: 'icon-bg-orange'
    },
    {
      id: 'act-3',
      title: 'Profile updated',
      time: '12 May 2024, 11:20 AM',
      type: 'profile',
      colorClass: 'icon-bg-purple'
    }
  ];

  return (
    <div className="overview-tab-container">
      {/* 2-Column Grid for Main Info Cards */}
      <div className="overview-cards-grid">
        {/* Left Column: Personal Information */}
        <div className="overview-card info-card-wrapper">
          <h3 className="overview-card-title">Personal Information</h3>

          <div className="info-fields-grid">
            {/* Full Name */}
            <div className="info-field-item">
              <div className="field-icon-bg">
                <User size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Full Name</span>
                <span className="field-value">{personalInfo.fullName}</span>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="info-field-item">
              <div className="field-icon-bg">
                <Calendar size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Date of Birth</span>
                <span className="field-value">{personalInfo.dob}</span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="info-field-item">
              <div className="field-icon-bg">
                <Phone size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Phone Number</span>
                <span className="field-value">{personalInfo.phone}</span>
              </div>
            </div>

            {/* Email Address */}
            <div className="info-field-item">
              <div className="field-icon-bg">
                <Mail size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Email Address</span>
                <span className="field-value">{personalInfo.email}</span>
              </div>
            </div>

            {/* Address */}
            <div className="info-field-item full-width-field">
              <div className="field-icon-bg">
                <MapPin size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Address</span>
                <span className="field-value">{personalInfo.address}</span>
              </div>
            </div>

            {/* Aadhaar Number with Toggle Eye Icon */}
            <div className="info-field-item">
              <div className="field-icon-bg">
                <CreditCard size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Aadhaar Number</span>
                <div className="value-eye-row">
                  <span className="field-value">
                    {showAadhaar ? personalInfo.rawAadhaar : personalInfo.aadhaar}
                  </span>
                  <button
                    type="button"
                    className="btn-eye-toggle"
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    aria-label="Toggle Aadhaar mask"
                  >
                    {showAadhaar ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Top: Documents Card */}
        <div className="overview-card info-card-wrapper">
          <div className="card-header-with-link">
            <h3 className="overview-card-title">Documents</h3>
            <button
              type="button"
              className="card-header-link"
              onClick={() => onNavigateTab && onNavigateTab('documents')}
            >
              View All
            </button>
          </div>

          <div className="documents-list-container">
            {documents.map((doc) => (
              <div key={doc.id} className="document-row-item">
                <div className="doc-left-group">
                  <span className="doc-icon-bullet">📄</span>
                  <span className="doc-name">{doc.name}</span>
                </div>

                <div className="doc-right-group">
                  <span className={`doc-status-pill status-${doc.status.toLowerCase()}`}>
                    {doc.status}
                  </span>
                  <button
                    type="button"
                    className="doc-action-btn"
                    onClick={() => onViewDocument && onViewDocument(doc)}
                    aria-label="View document"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    type="button"
                    className="doc-action-btn"
                    onClick={() => onViewDocument && onViewDocument(doc)}
                    aria-label="Download document"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Column Bottom: Farm Information */}
        <div className="overview-card info-card-wrapper">
          <h3 className="overview-card-title">Farm Information</h3>

          <div className="info-fields-grid">
            <div className="info-field-item">
              <div className="field-icon-bg">
                <Home size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Farm Name</span>
                <span className="field-value">{farmInfo.farmName}</span>
              </div>
            </div>

            <div className="info-field-item">
              <div className="field-icon-bg">
                <Ruler size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Farm Size</span>
                <span className="field-value">{farmInfo.farmSize}</span>
              </div>
            </div>

            <div className="info-field-item">
              <div className="field-icon-bg">
                <Sprout size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Primary Products</span>
                <span className="field-value">{farmInfo.primaryProducts}</span>
              </div>
            </div>

            <div className="info-field-item">
              <div className="field-icon-bg">
                <Leaf size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Farming Type</span>
                <span className="field-value">{farmInfo.farmingType}</span>
              </div>
            </div>

            <div className="info-field-item">
              <div className="field-icon-bg">
                <Award size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Years of Experience</span>
                <span className="field-value">{farmInfo.experience}</span>
              </div>
            </div>

            <div className="info-field-item">
              <div className="field-icon-bg">
                <Calendar size={16} />
              </div>
              <div className="field-text-group">
                <span className="field-label">Registered On</span>
                <span className="field-value">{farmInfo.registeredOn}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons inside Farm Information Card */}
          <div className="card-footer-actions">
            <button
              type="button"
              className="btn-card-outline-green"
              onClick={onEdit}
            >
              <Edit size={15} /> Edit Farmer
            </button>

            <button
              type="button"
              className="btn-card-outline-red"
              onClick={onRemove}
            >
              <Trash2 size={15} /> Remove Farmer
            </button>
          </div>
        </div>

        {/* Right Column Bottom: Bank Details Card */}
        <div className="overview-card info-card-wrapper">
          <div className="card-header-with-link">
            <h3 className="overview-card-title">Bank Details</h3>
            {bankDetails.isVerified && (
              <span className="bank-verified-badge">
                <CheckCircle2 size={13} /> Verified
              </span>
            )}
          </div>

          <div className="bank-info-content-grid">
            <div className="bank-field">
              <span className="field-label">Account Holder Name</span>
              <span className="field-value font-bold">{bankDetails.holderName}</span>
            </div>

            <div className="bank-field">
              <span className="field-label">Bank Name</span>
              <span className="field-value">{bankDetails.bankName}</span>
            </div>

            <div className="bank-field">
              <span className="field-label">IFSC Code</span>
              <span className="field-value font-mono">{bankDetails.ifscCode}</span>
            </div>

            <div className="bank-field">
              <span className="field-label">Account Number</span>
              <span className="field-value font-mono">{bankDetails.accountNumber}</span>
            </div>

            <div className="bank-field">
              <span className="field-label">Account Type</span>
              <span className="field-value">{bankDetails.accountType}</span>
            </div>
          </div>

          <div className="bank-card-footer">
            <button
              type="button"
              className="btn-card-outline-green full-width"
              onClick={onViewBankDetails}
            >
              View Bank Details
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Section: Recent Activity */}
      <div className="overview-card activity-section-card">
        <div className="card-header-with-link">
          <h3 className="overview-card-title">Recent Activity</h3>
          <button
            type="button"
            className="card-header-link"
            onClick={() => onNavigateTab && onNavigateTab('activity')}
          >
            View All Activity
          </button>
        </div>

        <div className="recent-activity-grid">
          {activities.map((act) => (
            <div key={act.id} className="activity-item-card">
              <div className={`activity-icon-badge ${act.colorClass}`}>
                {act.type === 'order' && <ShoppingCart size={18} />}
                {act.type === 'stock' && <PackageCheck size={18} />}
                {act.type === 'profile' && <UserCheck size={18} />}
              </div>
              <div className="activity-details">
                <h4 className="activity-title">{act.title}</h4>
                <span className="activity-time">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
