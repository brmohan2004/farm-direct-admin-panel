import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  X,
  Phone,
  Download,
  Edit,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import farmerAvatar from '../../../assets/farmer.png';

// Import Sheet Sub-components from local components folder
import {
  FarmerSheetHeader,
  FarmerSheetTabs,
  FarmerSheetOverviewTab,
  FarmerSheetDocumentsTab,
  FarmerSheetBankTab,
  FarmerSheetActivityTab,
  FarmerSheetOrdersTab,
  DocumentViewerModal,
  EditFarmerModal
} from './components';

import './FarmerDetailsSheet.css';

/**
 * Approved Farmer Details Sheet Component
 * Modular slide-up bottom sheet / responsive modal container
 */
const FarmerDetailsSheet = ({ isOpen = true, onClose, farmer: propFarmer }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Mock Farmer Data fallback
  const [farmerData, setFarmerData] = useState(
    propFarmer || {
      id: id || 'FD12345',
      name: 'Ramesh Kumar',
      isVerified: true,
      phone: '+91 98765 43210',
      email: 'ramesh.kumar@email.com',
      location: 'Coimbatore, Tamil Nadu',
      farmId: 'FD12345',
      memberSince: '12 May 2024',
      status: 'Active',
      avatar: farmerAvatar,
      stats: {
        products: 24,
        stockRequests: 156,
        ordersFulfilled: 342,
        rating: 4.8,
        reviewCount: 128
      },
      personalInfo: {
        fullName: 'Ramesh Kumar',
        dob: '15 Aug 1985',
        phone: '+91 98765 43210',
        email: 'ramesh.kumar@email.com',
        address: '123, Green Valley Road, Coimbatore - 641001, Tamil Nadu',
        aadhaar: 'XXXX XXXX 3210'
      },
      farmInfo: {
        farmName: 'Green Valley Organic Farms',
        farmSize: '5.2 Acres',
        primaryProducts: 'Organic Vegetables, Fruits',
        farmingType: 'Organic',
        experience: '8 Years',
        registeredOn: '12 May 2024'
      },
      documents: [
        { id: 'doc-1', name: 'Aadhaar Card', number: '9876 5432 3210', status: 'Verified', uploadedOn: '12 May 2024', size: '1.4 MB', type: 'PDF' },
        { id: 'doc-2', name: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', uploadedOn: '12 May 2024', size: '850 KB', type: 'JPG' },
        { id: 'doc-3', name: 'Farm Photo', number: 'Green Valley Plot A', status: 'Verified', uploadedOn: '12 May 2024', size: '2.8 MB', type: 'PNG' },
        { id: 'doc-4', name: 'Land Ownership Proof', number: 'Patta/Chitta #4521/2023', status: 'Verified', uploadedOn: '14 May 2024', size: '3.1 MB', type: 'PDF' },
        { id: 'doc-5', name: 'Organic Certificate', number: 'NPOP/IND/884920', status: 'Verified', uploadedOn: '15 May 2024', size: '1.9 MB', type: 'PDF' }
      ],
      bankDetails: {
        holderName: 'Ramesh Kumar',
        bankName: 'State Bank of India',
        branch: 'Coimbatore Main Branch, TN',
        ifscCode: 'SBIN0001234',
        accountNumber: 'XXXX XXXX 1234',
        accountType: 'Savings Account',
        upiId: 'ramesh.kumar@okicici',
        isVerified: true
      }
    }
  );

  useEffect(() => {
    if (propFarmer) {
      setFarmerData(propFarmer);
    }
  }, [propFarmer]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleOpenDoc = (doc) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  const handleSaveEdit = (updatedForm) => {
    setFarmerData((prev) => ({
      ...prev,
      name: updatedForm.name,
      phone: updatedForm.phone,
      email: updatedForm.email,
      location: updatedForm.location,
      personalInfo: {
        ...prev.personalInfo,
        fullName: updatedForm.name,
        phone: updatedForm.phone,
        email: updatedForm.email
      },
      farmInfo: {
        ...prev.farmInfo,
        farmName: updatedForm.farmName,
        farmSize: updatedForm.farmSize,
        primaryProducts: updatedForm.products
      }
    }));
    showToast('Farmer details updated successfully!');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark backdrop overlay */}
      <div className="farmer-details-sheet-backdrop" onClick={handleClose} />

      {/* Main Sheet Container */}
      <div className="farmer-details-sheet-container" role="dialog" aria-modal="true">
        {/* Mobile Drag Handle */}
        <div className="farmer-details-sheet-drag-handle" />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="farmer-sheet-toast">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sheet Top Header */}
        <div className="farmer-details-sheet-top">
          <div className="sheet-top-left">
            <button
              type="button"
              className="sheet-back-btn"
              onClick={handleClose}
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="sheet-top-badge">
                <CheckCircle2 size={12} /> Approved Verified Profile
              </span>
              <h2 className="sheet-top-title">Farmer Profile Details</h2>
            </div>
          </div>

          <div className="sheet-top-actions">
            <button
              type="button"
              className="sheet-action-icon-btn"
              onClick={() => setIsEditModalOpen(true)}
              title="Edit Profile"
            >
              <Edit size={16} />
            </button>
            <button
              type="button"
              className="sheet-action-icon-btn"
              onClick={() => showToast('Exporting Farmer PDF...')}
              title="Download PDF"
            >
              <Download size={16} />
            </button>
            <button
              type="button"
              className="sheet-close-btn"
              onClick={handleClose}
              aria-label="Close sheet"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sheet Content Scroll Area */}
        <div className="farmer-details-sheet-body">
          {/* 1. Header Profile Summary Banner */}
          <FarmerSheetHeader farmer={farmerData} />

          {/* 2. Navigation Tabs Bar */}
          <FarmerSheetTabs
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId)}
          />

          {/* 3. Active Tab Content */}
          <div className="farmer-sheet-tab-content">
            {activeTab === 'overview' && (
              <FarmerSheetOverviewTab
                farmer={farmerData}
                onNavigateTab={(tabId) => setActiveTab(tabId)}
              />
            )}

            {activeTab === 'documents' && (
              <FarmerSheetDocumentsTab
                farmer={farmerData}
                onViewDoc={handleOpenDoc}
              />
            )}

            {activeTab === 'bank' && (
              <FarmerSheetBankTab farmer={farmerData} />
            )}

            {activeTab === 'activity' && (
              <FarmerSheetActivityTab farmer={farmerData} />
            )}

            {activeTab === 'orders' && (
              <FarmerSheetOrdersTab farmer={farmerData} />
            )}
          </div>
        </div>

        {/* Sheet Action Footer Bar */}
        <div className="farmer-details-sheet-footer">
          <a
            href={`tel:${farmerData.phone}`}
            className="sheet-btn-secondary"
          >
            <Phone size={15} /> Call Farmer
          </a>

          <button
            type="button"
            className="sheet-btn-primary"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit size={15} /> Edit Farmer Info
          </button>
        </div>
      </div>

      {/* Document Viewer & Edit Modals */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />

      <EditFarmerModal
        farmer={farmerData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default FarmerDetailsSheet;
