import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import farmerAvatar from '../../../assets/farmer.png';

// Sub-components
import {
  FarmerDetailsHeader,
  FarmerProfileSummary,
  FarmerDetailsTabs,
  OverviewTab,
  DocumentsTab,
  BankDetailsTab,
  ActivityTab,
  OrdersTab,
  ReviewsTab,
  DocumentViewerModal,
  EditFarmerModal
} from './components';

import './FarmerDetailsPage.css';

/**
 * FarmerDetailsPage Main Page Component
 * Renders complete modular Farmer Details screen for mobile, tablet, and desktop viewports.
 */
const FarmerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Active Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Modal States
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  // Mock Farmer Data (Matches Ramesh Kumar design specifications)
  const [farmerData, setFarmerData] = useState({
    id: id || 'FD12345',
    name: 'Ramesh Kumar',
    isVerified: true,
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    location: 'Coimbatore, Tamil Nadu, India',
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
      address: '123, Green Valley Road, Coimbatore - 641001, Tamil Nadu, India',
      aadhaar: 'XXXX XXXX 3210',
      rawAadhaar: '9876 5432 3210'
    },
    farmInfo: {
      farmName: 'Green Valley Farms',
      farmSize: '5 Acres',
      primaryProducts: 'Vegetables, Fruits',
      farmingType: 'Organic',
      experience: '8 Years',
      registeredOn: '12 May 2024'
    },
    documents: [
      { id: 'doc-1', name: 'Aadhaar Card', number: '9876 5432 3210', status: 'Verified', uploadedOn: '12 May 2024', size: '1.4 MB', type: 'PDF' },
      { id: 'doc-2', name: 'PAN Card', number: 'ABCDE1234F', status: 'Verified', uploadedOn: '12 May 2024', size: '850 KB', type: 'JPG' },
      { id: 'doc-3', name: 'Farm Photo', number: 'Green Valley Plot A', status: 'Verified', uploadedOn: '12 May 2024', size: '2.8 MB', type: 'PNG' },
      { id: 'doc-4', name: 'Land Ownership Proof', number: 'Patta/Chitta #4521/2023', status: 'Pending', uploadedOn: '14 May 2024', size: '3.1 MB', type: 'PDF' },
      { id: 'doc-5', name: 'Organic Certificate', number: 'NPOP/IND/884920', status: 'Pending', uploadedOn: '15 May 2024', size: '1.9 MB', type: 'PDF' }
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
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers
  const handleOpenDoc = (doc) => {
    setSelectedDoc(doc);
    setIsDocModalOpen(true);
  };

  const handleApproveDoc = (docToApprove) => {
    setFarmerData((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === docToApprove.id ? { ...d, status: 'Verified' } : d
      )
    }));
    showToast(`Document "${docToApprove.name}" verified successfully!`);
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
        email: updatedForm.email,
        address: updatedForm.location
      },
      farmInfo: {
        ...prev.farmInfo,
        farmName: updatedForm.farmName,
        farmSize: updatedForm.farmSize,
        primaryProducts: updatedForm.products
      }
    }));
    showToast('Farmer profile updated successfully!');
  };

  const handleRemoveFarmer = () => {
    if (window.confirm('Are you sure you want to remove Ramesh Kumar from the system?')) {
      showToast('Farmer removed from database.');
      setTimeout(() => navigate('/farmer-management/requests'), 1000);
    }
  };

  const handleDownloadPdf = () => {
    showToast('Exporting Ramesh Kumar Profile PDF...');
  };

  const handleSuspendFarmer = () => {
    showToast('Farmer account status changed to Suspended.');
  };

  return (
    <div className="farmer-details-page-wrapper">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="farmer-details-toast">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar with Back Icon & 3-Dots Menu */}
      <FarmerDetailsHeader
        onEdit={() => setIsEditModalOpen(true)}
        onVerify={() => setActiveTab('documents')}
        onDownloadPdf={handleDownloadPdf}
        onSuspend={handleSuspendFarmer}
        onRemove={handleRemoveFarmer}
      />

      {/* Top Profile Summary Banner / Card */}
      <FarmerProfileSummary farmer={farmerData} />

      {/* Responsive Navigation Tabs */}
      <FarmerDetailsTabs
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      {/* Dynamic Tab Contents */}
      <div className="tab-content-wrapper">
        {activeTab === 'overview' && (
          <OverviewTab
            farmer={farmerData}
            onEdit={() => setIsEditModalOpen(true)}
            onRemove={handleRemoveFarmer}
            onViewDocument={handleOpenDoc}
            onViewBankDetails={() => setActiveTab('bank')}
            onNavigateTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            farmer={farmerData}
            onViewDocument={handleOpenDoc}
          />
        )}

        {activeTab === 'bank' && (
          <BankDetailsTab
            farmer={farmerData}
            onEditBank={() => setIsEditModalOpen(true)}
          />
        )}

        {activeTab === 'activity' && (
          <ActivityTab farmer={farmerData} />
        )}

        {activeTab === 'orders' && (
          <OrdersTab farmer={farmerData} />
        )}

        {activeTab === 'reviews' && (
          <ReviewsTab farmer={farmerData} />
        )}
      </div>

      {/* Modals */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onApproveDoc={handleApproveDoc}
      />

      <EditFarmerModal
        farmer={farmerData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default FarmerDetailsPage;
