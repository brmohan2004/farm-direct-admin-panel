import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Asset Images (using workspace assets directory)
import rameshImg from '../../../assets/farmer.png';
import selviImg from '../../../assets/image copy.png';
import manojImg from '../../../assets/image copy 2.png';
import kavithaImg from '../../../assets/image copy 3.png';
import raghavanImg from '../../../assets/image.png';

import vegMixImg from '../../../assets/cat_vegetables.png';
import fruitsMixImg from '../../../assets/cat_fruits.png';
import milletsImg from '../../../assets/cat_grains_pulses.png';
import leafyGreensImg from '../../../assets/prod_spinach.png';
import tomatoesImg from '../../../assets/prod_tomatoes.png';
import potatoesImg from '../../../assets/prod_potatoes.png';
import carrotsImg from '../../../assets/prod_carrots.png';
import cauliflowerImg from '../../../assets/prod_cauliflower.png';
import greenBeansImg from '../../../assets/prod_green_beans.png';
import peppersImg from '../../../assets/prod_peppers.png';

// Modular Page Components
import {
  StockInboxHeader,
  StockInboxStatCards,
  StockInboxFilterBar,
  StockInboxTable,
  StockInboxCards,
  StockInboxFilterModal,
  StockInboxDetailsModal
} from './components';

// Global UI Components
import Pagination from '../../../components/ui/Pagination/Pagination';
import './StockInboxPage.css';

// Initial 24 stock request items matching the design screenshot exactly
const INITIAL_STOCK_REQUESTS = [
  {
    id: 'stock-1',
    farmerName: 'Ramesh Kumar',
    location: 'Coimbatore, Tamil Nadu',
    avatar: rameshImg,
    productName: 'Vegetables Mix',
    category: 'Vegetables',
    productImage: vegMixImg,
    quantity: '250 kg',
    pricePerKg: '25',
    requestId: '#SR12345',
    requestedDate: '12 May 2024',
    requestedTime: '10:20 AM',
    status: 'Pending'
  },
  {
    id: 'stock-2',
    farmerName: 'Selvi M.',
    location: 'Erode, Tamil Nadu',
    avatar: selviImg,
    productName: 'Fruits Mix',
    category: 'Fruits',
    productImage: fruitsMixImg,
    quantity: '180 kg',
    pricePerKg: '40',
    requestId: '#SR12344',
    requestedDate: '12 May 2024',
    requestedTime: '09:15 AM',
    status: 'Approved'
  },
  {
    id: 'stock-3',
    farmerName: 'Manoj P.',
    location: 'Tirupur, Tamil Nadu',
    avatar: manojImg,
    productName: 'Millets',
    category: 'Millets',
    productImage: milletsImg,
    quantity: '100 kg',
    pricePerKg: '60',
    requestId: '#SR12343',
    requestedDate: '11 May 2024',
    requestedTime: '07:45 PM',
    status: 'Pending'
  },
  {
    id: 'stock-4',
    farmerName: 'Kavitha R.',
    location: 'Salem, Tamil Nadu',
    avatar: kavithaImg,
    productName: 'Leafy Greens',
    category: 'Vegetables',
    productImage: leafyGreensImg,
    quantity: '120 kg',
    pricePerKg: '20',
    requestId: '#SR12342',
    requestedDate: '11 May 2024',
    requestedTime: '06:30 PM',
    status: 'Rejected'
  },
  {
    id: 'stock-5',
    farmerName: 'Raghavan S.',
    location: 'Dindigul, Tamil Nadu',
    avatar: raghavanImg,
    productName: 'Tomatoes',
    category: 'Vegetables',
    productImage: tomatoesImg,
    quantity: '200 kg',
    pricePerKg: '30',
    requestId: '#SR12341',
    requestedDate: '11 May 2024',
    requestedTime: '05:10 PM',
    status: 'Approved'
  },
  {
    id: 'stock-6',
    farmerName: 'Suresh V.',
    location: 'Madurai, Tamil Nadu',
    avatar: rameshImg,
    productName: 'Potatoes',
    category: 'Vegetables',
    productImage: potatoesImg,
    quantity: '300 kg',
    pricePerKg: '18',
    requestId: '#SR12340',
    requestedDate: '10 May 2024',
    requestedTime: '04:25 PM',
    status: 'Pending'
  },
  {
    id: 'stock-7',
    farmerName: 'Anitha P.',
    location: 'Thanjavur, Tamil Nadu',
    avatar: kavithaImg,
    productName: 'Carrots',
    category: 'Vegetables',
    productImage: carrotsImg,
    quantity: '150 kg',
    pricePerKg: '35',
    requestId: '#SR12339',
    requestedDate: '10 May 2024',
    requestedTime: '03:10 PM',
    status: 'Pending'
  },
  {
    id: 'stock-8',
    farmerName: 'Karthik K.',
    location: 'Karur, Tamil Nadu',
    avatar: manojImg,
    productName: 'Cauliflower',
    category: 'Vegetables',
    productImage: cauliflowerImg,
    quantity: '220 kg',
    pricePerKg: '28',
    requestId: '#SR12338',
    requestedDate: '10 May 2024',
    requestedTime: '01:50 PM',
    status: 'Approved'
  },
  {
    id: 'stock-9',
    farmerName: 'Devi Saravanan',
    location: 'Namakkal, Tamil Nadu',
    avatar: selviImg,
    productName: 'Green Beans',
    category: 'Vegetables',
    productImage: greenBeansImg,
    quantity: '130 kg',
    pricePerKg: '45',
    requestId: '#SR12337',
    requestedDate: '09 May 2024',
    requestedTime: '11:20 AM',
    status: 'Pending'
  },
  {
    id: 'stock-10',
    farmerName: 'Murugan T.',
    location: 'Theni, Tamil Nadu',
    avatar: raghavanImg,
    productName: 'Bell Peppers',
    category: 'Vegetables',
    productImage: peppersImg,
    quantity: '90 kg',
    pricePerKg: '55',
    requestId: '#SR12336',
    requestedDate: '09 May 2024',
    requestedTime: '09:40 AM',
    status: 'Pending'
  },
  {
    id: 'stock-11',
    farmerName: 'Priya N.',
    location: 'Pollachi, Tamil Nadu',
    avatar: selviImg,
    productName: 'Fresh Bananas',
    category: 'Fruits',
    productImage: fruitsMixImg,
    quantity: '400 kg',
    pricePerKg: '22',
    requestId: '#SR12335',
    requestedDate: '08 May 2024',
    requestedTime: '04:15 PM',
    status: 'Approved'
  },
  {
    id: 'stock-12',
    farmerName: 'Venkatesh R.',
    location: 'Vellore, Tamil Nadu',
    avatar: rameshImg,
    productName: 'Organic Onions',
    category: 'Vegetables',
    productImage: vegMixImg,
    quantity: '500 kg',
    pricePerKg: '26',
    requestId: '#SR12334',
    requestedDate: '08 May 2024',
    requestedTime: '02:30 PM',
    status: 'Rejected'
  },
  {
    id: 'stock-13',
    farmerName: 'Lakshmi Narayanan',
    location: 'Kanchipuram, Tamil Nadu',
    avatar: manojImg,
    productName: 'Finger Millets (Ragi)',
    category: 'Millets',
    productImage: milletsImg,
    quantity: '250 kg',
    pricePerKg: '52',
    requestId: '#SR12333',
    requestedDate: '08 May 2024',
    requestedTime: '10:05 AM',
    status: 'Approved'
  },
  {
    id: 'stock-14',
    farmerName: 'Senthamizhai V.',
    location: 'Trichy, Tamil Nadu',
    avatar: raghavanImg,
    productName: 'Organic Spinach',
    category: 'Leafy Greens',
    productImage: leafyGreensImg,
    quantity: '80 kg',
    pricePerKg: '24',
    requestId: '#SR12332',
    requestedDate: '07 May 2024',
    requestedTime: '06:45 PM',
    status: 'Pending'
  },
  {
    id: 'stock-15',
    farmerName: 'Deepa M.',
    location: 'Cuddalore, Tamil Nadu',
    avatar: kavithaImg,
    productName: 'Red Tomatoes',
    category: 'Vegetables',
    productImage: tomatoesImg,
    quantity: '350 kg',
    pricePerKg: '28',
    requestId: '#SR12331',
    requestedDate: '07 May 2024',
    requestedTime: '01:20 PM',
    status: 'Approved'
  },
  {
    id: 'stock-16',
    farmerName: 'Ganesh K.',
    location: 'Hosur, Tamil Nadu',
    avatar: rameshImg,
    productName: 'Sweet Potatoes',
    category: 'Vegetables',
    productImage: potatoesImg,
    quantity: '170 kg',
    pricePerKg: '32',
    requestId: '#SR12330',
    requestedDate: '06 May 2024',
    requestedTime: '05:30 PM',
    status: 'Pending'
  },
  {
    id: 'stock-17',
    farmerName: 'Revathi S.',
    location: 'Dharmapuri, Tamil Nadu',
    avatar: selviImg,
    productName: 'Fresh Mangoes',
    category: 'Fruits',
    productImage: fruitsMixImg,
    quantity: '210 kg',
    pricePerKg: '65',
    requestId: '#SR12329',
    requestedDate: '06 May 2024',
    requestedTime: '03:15 PM',
    status: 'Rejected'
  },
  {
    id: 'stock-18',
    farmerName: 'Balamurugan P.',
    location: 'Perambalur, Tamil Nadu',
    avatar: manojImg,
    productName: 'Pearl Millets',
    category: 'Millets',
    productImage: milletsImg,
    quantity: '190 kg',
    pricePerKg: '48',
    requestId: '#SR12328',
    requestedDate: '05 May 2024',
    requestedTime: '11:50 AM',
    status: 'Approved'
  },
  {
    id: 'stock-19',
    farmerName: 'Shanthi R.',
    location: 'Virudhunagar, Tamil Nadu',
    avatar: kavithaImg,
    productName: 'Capsicum',
    category: 'Vegetables',
    productImage: peppersImg,
    quantity: '110 kg',
    pricePerKg: '50',
    requestId: '#SR12327',
    requestedDate: '05 May 2024',
    requestedTime: '09:10 AM',
    status: 'Pending'
  },
  {
    id: 'stock-20',
    farmerName: 'Vijay A.',
    location: 'Tirunelveli, Tamil Nadu',
    avatar: raghavanImg,
    productName: 'Cabbage',
    category: 'Vegetables',
    productImage: vegMixImg,
    quantity: '280 kg',
    pricePerKg: '16',
    requestId: '#SR12326',
    requestedDate: '04 May 2024',
    requestedTime: '04:40 PM',
    status: 'Pending'
  },
  {
    id: 'stock-21',
    farmerName: 'Meenakshi N.',
    location: 'Nagercoil, Tamil Nadu',
    avatar: selviImg,
    productName: 'Guava Basket',
    category: 'Fruits',
    productImage: fruitsMixImg,
    quantity: '140 kg',
    pricePerKg: '38',
    requestId: '#SR12325',
    requestedDate: '04 May 2024',
    requestedTime: '02:05 PM',
    status: 'Approved'
  },
  {
    id: 'stock-22',
    farmerName: 'Dhanapal S.',
    location: 'Ariyalur, Tamil Nadu',
    avatar: manojImg,
    productName: 'Green Peas',
    category: 'Vegetables',
    productImage: greenBeansImg,
    quantity: '95 kg',
    pricePerKg: '70',
    requestId: '#SR12324',
    requestedDate: '03 May 2024',
    requestedTime: '05:15 PM',
    status: 'Pending'
  },
  {
    id: 'stock-23',
    farmerName: 'Sudha V.',
    location: 'Kallakurichi, Tamil Nadu',
    avatar: kavithaImg,
    productName: 'Coriander Leaves',
    category: 'Leafy Greens',
    productImage: leafyGreensImg,
    quantity: '60 kg',
    pricePerKg: '30',
    requestId: '#SR12323',
    requestedDate: '03 May 2024',
    requestedTime: '11:30 AM',
    status: 'Rejected'
  },
  {
    id: 'stock-24',
    farmerName: 'Kannan M.',
    location: 'Tiruvannamalai, Tamil Nadu',
    avatar: rameshImg,
    productName: 'Sweet Corn',
    category: 'Vegetables',
    productImage: vegMixImg,
    quantity: '310 kg',
    pricePerKg: '22',
    requestId: '#SR12322',
    requestedDate: '02 May 2024',
    requestedTime: '10:00 AM',
    status: 'Pending'
  }
];

const StockInboxPage = () => {
  const navigate = useNavigate();

  // State Management
  const [requests, setRequests] = useState(INITIAL_STOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState('All Requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('12 May - 18 May, 2024');

  // Modal States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Filter Criteria State
  const [filterCriteria, setFilterCriteria] = useState({
    location: '',
    category: '',
    status: 'All',
    priceRange: 'All'
  });

  // Desktop Pagination (6 per page matches "Showing 1 to 6 of 24 requests" in screenshot!)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Mobile Infinite Scroll State
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const [isLoadingMoreMobile, setIsLoadingMoreMobile] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compute status summary counts dynamically from state
  const counts = useMemo(() => {
    const pending = requests.filter((r) => r.status === 'Pending').length;
    const approved = requests.filter((r) => r.status === 'Approved').length;
    const rejected = requests.filter((r) => r.status === 'Rejected').length;
    return {
      all: requests.length,
      pending,
      approved,
      rejected
    };
  }, [requests]);

  // Filter requests based on Tab, Search input, and Modal filters
  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      // 1. Tab Status Filter
      if (activeTab === 'Pending' && item.status !== 'Pending') return false;
      if (activeTab === 'Approved' && item.status !== 'Approved') return false;
      if (activeTab === 'Rejected' && item.status !== 'Rejected') return false;

      // 2. Search Term Filter
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesFarmer = item.farmerName.toLowerCase().includes(query);
        const matchesProduct = item.productName.toLowerCase().includes(query);
        const matchesLocation = item.location.toLowerCase().includes(query);
        const matchesId = item.requestId.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesFarmer && !matchesProduct && !matchesLocation && !matchesId && !matchesCategory) {
          return false;
        }
      }

      // 3. Modal Filter Criteria
      if (filterCriteria.status !== 'All' && item.status !== filterCriteria.status) {
        return false;
      }
      if (filterCriteria.category && item.category !== filterCriteria.category) {
        return false;
      }
      if (filterCriteria.location && !item.location.toLowerCase().includes(filterCriteria.location.toLowerCase())) {
        return false;
      }
      if (filterCriteria.priceRange !== 'All') {
        const price = parseFloat(item.pricePerKg) || 0;
        if (filterCriteria.priceRange === 'under25' && price >= 25) return false;
        if (filterCriteria.priceRange === '25to50' && (price < 25 || price > 50)) return false;
        if (filterCriteria.priceRange === 'above50' && price <= 50) return false;
      }

      return true;
    });
  }, [requests, activeTab, searchTerm, filterCriteria]);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
    setMobileVisibleCount(4);
  }, [activeTab, searchTerm, filterCriteria, dateRange]);

  // Desktop Sliced Items
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRequests, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;

  // Mobile Sliced Items
  const mobileRequests = useMemo(() => {
    return filteredRequests.slice(0, mobileVisibleCount);
  }, [filteredRequests, mobileVisibleCount]);

  const hasMoreMobile = mobileVisibleCount < filteredRequests.length;

  const handleLoadMoreMobile = () => {
    if (isLoadingMoreMobile || !hasMoreMobile) return;
    setIsLoadingMoreMobile(true);
    setTimeout(() => {
      setMobileVisibleCount((prev) => Math.min(prev + 4, filteredRequests.length));
      setIsLoadingMoreMobile(false);
    }, 400);
  };

  // Action Handlers
  const handleViewDetails = (item) => {
    setSelectedRequest(item);
    setIsDetailsModalOpen(true);
  };

  const handleApprove = (item) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, status: 'Approved' } : r))
    );
    showToast(`Stock request ${item.requestId} for "${item.productName}" approved successfully!`);
  };

  const handleReject = (item) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === item.id ? { ...r, status: 'Rejected' } : r))
    );
    showToast(`Stock request ${item.requestId} rejected.`);
  };

  const hasActiveFilters = Boolean(
    filterCriteria.location || filterCriteria.category || filterCriteria.status !== 'All' || filterCriteria.priceRange !== 'All'
  );

  return (
    <div className="stock-inbox-page-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="stock-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <StockInboxHeader
        title="Stock Inbox"
        subtitle="Review and manage incoming stock from farmers."
      />

      {/* 2. Top Summary Stat Cards / Tab Selectors */}
      <StockInboxStatCards
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        counts={counts}
      />

      {/* 3. Controls & Filter Bar */}
      <StockInboxFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => setSearchTerm(val)}
        onSearchClear={() => setSearchTerm('')}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        dateRange={dateRange}
        onDateRangeChange={(val) => setDateRange(val)}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 4. Display Area (Table for Desktop/Tablet, Stacked Cards for Mobile) */}
      <div className="stock-desktop-tablet-view">
        <StockInboxTable
          requests={paginatedRequests}
          onViewDetails={handleViewDetails}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      <div className="stock-mobile-cards-view">
        <StockInboxCards
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

      {/* 5. Pagination (Desktop & Tablet View) */}
      <div className="stock-desktop-pagination">
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

      {/* 6. Filter Modal Overlay */}
      <StockInboxFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        currentFilters={filterCriteria}
        onApplyFilters={(filters) => setFilterCriteria(filters)}
        onResetFilters={() => setFilterCriteria({ location: '', category: '', status: 'All', priceRange: 'All' })}
      />

      {/* 7. Request Details Modal */}
      <StockInboxDetailsModal
        request={selectedRequest}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedRequest(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default StockInboxPage;
