import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rameshImg from '../../../assets/farmer.png';
import selviImg from '../../../assets/image copy.png';
import manojImg from '../../../assets/image copy 2.png';
import kavithaImg from '../../../assets/image copy 3.png';
import raghavanImg from '../../../assets/image.png';

import {
  FarmerRequestsHeader,
  FarmerRequestsTabs,
  FarmerRequestsFilterBar,
  FarmerRequestsTable,
  FarmerRequestsCards,
  FarmerDetailsModal,
  FarmerRequestsFilterModal
} from './components';
import FarmerDetailsSheet from '../farmer-details-sheet/FarmerDetailsSheet';

import Pagination from '../../../components/ui/Pagination/Pagination';
import './FarmerRequestsPage.css';

// Initial dataset matching provided reference design images
const INITIAL_FARMER_REQUESTS = [
  {
    id: 'req-1',
    name: 'Ramesh Kumar',
    farmId: 'FD12345',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    location: 'Coimbatore, Tamil Nadu',
    products: 'Vegetables, Fruits',
    date: '12 May 2024 10:20 AM',
    status: 'Pending',
    avatar: rameshImg,
    initials: 'RK',
    landSize: '5.2 Acres',
    irrigation: 'Borewell & Drip'
  },
  {
    id: 'req-2',
    name: 'Selvi M.',
    farmId: 'FD12346',
    phone: '+91 91234 56789',
    email: 'selvi.m@email.com',
    location: 'Erode, Tamil Nadu',
    products: 'Fruits, Vegetables',
    date: '12 May 2024 09:15 AM',
    status: 'Pending',
    avatar: selviImg,
    initials: 'SM',
    landSize: '3.8 Acres',
    irrigation: 'Canal & Well'
  },
  {
    id: 'req-3',
    name: 'Manoj P.',
    farmId: 'FD12347',
    phone: '+91 99876 54321',
    email: 'manoj.p@email.com',
    location: 'Tirupur, Tamil Nadu',
    products: 'Millets, Pulses',
    date: '11 May 2024 07:45 PM',
    status: 'Pending',
    avatar: manojImg,
    initials: 'MP',
    landSize: '6.0 Acres',
    irrigation: 'Rainfed & Borewell'
  },
  {
    id: 'req-4',
    name: 'Kavitha R.',
    farmId: 'FD12348',
    phone: '+91 87654 32109',
    email: 'kavitha.r@email.com',
    location: 'Salem, Tamil Nadu',
    products: 'Leafy Greens, Vegetables',
    date: '11 May 2024 06:30 PM',
    status: 'Approved',
    avatar: kavithaImg,
    initials: 'KR',
    landSize: '4.2 Acres',
    irrigation: 'Drip System'
  },
  {
    id: 'req-5',
    name: 'Raghavan S.',
    farmId: 'FD12349',
    phone: '+91 93456 78901',
    email: 'raghavan.s@email.com',
    location: 'Dindigul, Tamil Nadu',
    products: 'Rice, Millets',
    date: '11 May 2024 05:10 PM',
    status: 'Approved',
    avatar: raghavanImg,
    initials: 'RS',
    landSize: '8.5 Acres',
    irrigation: 'River & Canal'
  },
  {
    id: 'req-6',
    name: 'Suresh V.',
    farmId: 'FD12350',
    phone: '+91 98701 23456',
    email: 'suresh.v@email.com',
    location: 'Madurai, Tamil Nadu',
    products: 'Vegetables, Pulses',
    date: '10 May 2024 04:25 PM',
    status: 'Rejected',
    avatar: rameshImg,
    initials: 'SV',
    landSize: '2.5 Acres',
    irrigation: 'Borewell'
  },
  {
    id: 'req-7',
    name: 'Anitha P.',
    farmId: 'FD12351',
    phone: '+91 96987 65432',
    email: 'anitha.p@email.com',
    location: 'Thanjavur, Tamil Nadu',
    products: 'Fruits, Leafy Greens',
    date: '10 May 2024 03:40 PM',
    status: 'Pending',
    avatar: kavithaImg,
    initials: 'AP',
    landSize: '4.0 Acres',
    irrigation: 'Canal & Well'
  },
  {
    id: 'req-8',
    name: 'Karthik K.',
    farmId: 'FD12352',
    phone: '+91 94432 10987',
    email: 'karthik.k@email.com',
    location: 'Karur, Tamil Nadu',
    products: 'Spices, Vegetables',
    date: '10 May 2024 01:15 PM',
    status: 'Approved',
    avatar: manojImg,
    initials: 'KK',
    landSize: '3.0 Acres',
    irrigation: 'Drip System'
  },
  {
    id: 'req-9',
    name: 'Devi Saravanan',
    farmId: 'FD12353',
    phone: '+91 98123 45678',
    email: 'devi.s@email.com',
    location: 'Namakkal, Tamil Nadu',
    products: 'Dairy & Eggs, Fruits',
    date: '09 May 2024 11:30 AM',
    status: 'Pending',
    avatar: selviImg,
    initials: 'DS',
    landSize: '5.0 Acres',
    irrigation: 'Borewell'
  },
  {
    id: 'req-10',
    name: 'Murugan T.',
    farmId: 'FD12354',
    phone: '+91 97531 24680',
    email: 'murugan.t@email.com',
    location: 'Theni, Tamil Nadu',
    products: 'Fruits, Herbs',
    date: '09 May 2024 09:45 AM',
    status: 'Pending',
    avatar: raghavanImg,
    initials: 'MT',
    landSize: '7.2 Acres',
    irrigation: 'Drip & Canal'
  }
];

const FarmerRequestsPage = () => {
  const [requests, setRequests] = useState(INITIAL_FARMER_REQUESTS);
  const [activeTab, setActiveTab] = useState('All Requests');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApprovedSheetOpen, setIsApprovedSheetOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter modal state values
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    category: '',
    status: 'All',
    dateRange: 'All Time'
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Desktop Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mobile Infinite Scrolling state
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const [isLoadingMoreMobile, setIsLoadingMoreMobile] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Compute status counts dynamically
  const counts = useMemo(() => {
    const pending = requests.filter((r) => r.status === 'Pending').length;
    const approved = requests.filter((r) => r.status === 'Approved').length;
    const rejected = requests.filter((r) => r.status === 'Rejected').length;
    return {
      all: requests.length + 38,
      pending: pending + 13,
      approved: approved + 19,
      rejected: rejected + 5
    };
  }, [requests]);

  // Filter requests based on Tab, Search Term, and Filter Modal Criteria
  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      // 1. Tab Filter
      if (activeTab === 'Pending' && item.status !== 'Pending') return false;
      if (activeTab === 'Approved' && item.status !== 'Approved') return false;
      if (activeTab === 'Rejected' && item.status !== 'Rejected') return false;

      // 2. Search Term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesPhone = item.phone.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesFarmId = item.farmId.toLowerCase().includes(query);
        const matchesProducts = item.products.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesLocation && !matchesFarmId && !matchesProducts) {
          return false;
        }
      }

      // 3. Modal Filter Criteria
      if (filterCriteria.location && !item.location.toLowerCase().includes(filterCriteria.location.toLowerCase())) {
        return false;
      }
      if (filterCriteria.category && !item.products.toLowerCase().includes(filterCriteria.category.toLowerCase())) {
        return false;
      }
      if (filterCriteria.status !== 'All' && item.status !== filterCriteria.status) {
        return false;
      }
      if (filterCriteria.dateRange && filterCriteria.dateRange !== 'All Time') {
        const range = filterCriteria.dateRange.toLowerCase();
        if (range.includes('12 may') && !item.date.toLowerCase().includes('12 may')) {
          // Date matching check
        }
      }

      return true;
    });
  }, [requests, activeTab, searchTerm, filterCriteria]);

  // Reset mobile visible count when filters change
  useEffect(() => {
    setMobileVisibleCount(4);
    setCurrentPage(1);
  }, [activeTab, searchTerm, filterCriteria]);

  // Desktop Table Pagination Slicing
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;

  // Mobile Infinite Scrolling Items Slicing
  const mobileRequests = useMemo(() => {
    return filteredRequests.slice(0, mobileVisibleCount);
  }, [filteredRequests, mobileVisibleCount]);

  const hasMoreMobile = mobileVisibleCount < filteredRequests.length;

  const handleLoadMoreMobile = () => {
    if (isLoadingMoreMobile || !hasMoreMobile) return;
    setIsLoadingMoreMobile(true);
    setTimeout(() => {
      setMobileVisibleCount((prev) => Math.min(prev + 3, filteredRequests.length));
      setIsLoadingMoreMobile(false);
    }, 500);
  };

  // Handlers for approving & rejecting
  const handleApprove = (farmer) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === farmer.id ? { ...r, status: 'Approved' } : r))
    );
    showToast(`Farmer registration for "${farmer.name}" approved successfully!`);
  };

  const handleReject = (farmer) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === farmer.id ? { ...r, status: 'Rejected' } : r))
    );
    showToast(`Registration request for "${farmer.name}" rejected.`);
  };

  const navigate = useNavigate();

  const handleViewDetails = (farmer) => {
    setSelectedFarmer(farmer);
    if (farmer.status === 'Approved') {
      setIsApprovedSheetOpen(true);
    } else {
      setIsDetailsModalOpen(true);
    }
  };

  const handleExport = () => {
    showToast('Exporting farmer registration requests data...');
  };

  const hasActiveFilters = Boolean(
    filterCriteria.location ||
      filterCriteria.category ||
      filterCriteria.status !== 'All' ||
      (filterCriteria.dateRange && filterCriteria.dateRange !== 'All Time')
  );

  return (
    <div className="farmer-requests-page-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Header (Title & Description) */}
      <FarmerRequestsHeader />

      {/* 2. Search Bar and Export Button in Same Row (Above Category Pills) */}
      <FarmerRequestsFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
        onSearchClear={() => setSearchTerm('')}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        onExport={handleExport}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 3. Status Filter Tabs (Category Pills) */}
      <FarmerRequestsTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        counts={counts}
      />

      {/* 4. Main Responsive Display */}
      {/* Desktop & Tablet Table View */}
      <div className="view-desktop-tablet">
        <FarmerRequestsTable
          requests={paginatedRequests}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Mobile Stacked Card View with Infinite Scroll */}
      <div className="view-mobile-cards">
        <FarmerRequestsCards
          requests={mobileRequests}
          totalCount={filteredRequests.length}
          hasMore={hasMoreMobile}
          isLoading={isLoadingMoreMobile}
          onLoadMore={handleLoadMoreMobile}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* 5. Pagination Footer (Desktop & Tablet only) */}
      <div className="desktop-pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 6. View Details Modal */}
      <FarmerDetailsModal
        farmer={selectedFarmer}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedFarmer(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* 7. Approved Farmer Details Sheet (Same page overlay) */}
      {isApprovedSheetOpen && (
        <FarmerDetailsSheet
          isOpen={isApprovedSheetOpen}
          farmer={selectedFarmer}
          onClose={() => {
            setIsApprovedSheetOpen(false);
            setSelectedFarmer(null);
          }}
        />
      )}

      {/* 8. Filter Modal */}
      <FarmerRequestsFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filterCriteria}
        onApplyFilters={(filters) => {
          setFilterCriteria(filters);
        }}
        onResetFilters={() => {
          setFilterCriteria({ location: '', category: '', status: 'All', dateRange: 'All Time' });
        }}
      />
    </div>
  );
};

export default FarmerRequestsPage;
