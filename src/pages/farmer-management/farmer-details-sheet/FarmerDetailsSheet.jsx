import React, { useState, useEffect, useRef } from 'react';
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

  const mockFarmer = propFarmer || {
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
  };

  const [farmerData, setFarmerData] = useState(mockFarmer);

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
        handleClose();
      }
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
      <div
        className={`farmer-details-sheet-container ${isExpanded ? 'expanded' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
      >
        {/* Mobile Drag Handle */}
        <div
          className="farmer-details-sheet-drag-handle"
          onClick={() => setIsExpanded((prev) => !prev)}
          role="button"
          aria-label="Toggle sheet height"
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="farmer-sheet-toast">
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sheet Content Scroll Area */}
        <div
          className="farmer-details-sheet-body"
          ref={bodyRef}
          onScroll={handleScroll}
        >
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
          <button
            type="button"
            className="sheet-btn-close"
            onClick={handleClose}
          >
            Close
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
