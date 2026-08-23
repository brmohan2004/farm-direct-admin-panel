import React, { useState, useEffect, useMemo } from 'react';
import { Filter } from 'lucide-react';
import {
  OrdersHeader,
  OrdersFilterBar,
  OrdersTable,
  OrdersCards,
  OrderDetailsModal,
  OrdersFilterModal,
} from './components';
import { OrderDetailsSheet } from '../order-details-sheet';
import { Pagination } from '../../../components/ui';
import { mockOrders } from './mockOrders';
import './OrdersPage.css';

/**
 * OrdersPage Component
 * Main page for customer orders management across mobile, tablet, and desktop views.
 */
const OrdersPage = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    payment: 'all',
    dateRange: 'all',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Mobile detection & FAB scroll hide
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
  const [isFabVisible, setIsFabVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsFabVisible(false);
      } else {
        setIsFabVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate status counts for tab badges
  const statusCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((ord) => {
      const st = (ord.status || '').toLowerCase();
      if (counts[st] !== undefined) {
        counts[st] += 1;
      }
    });
    return counts;
  }, [orders]);

  // Filter & Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      // Tab filter
      if (activeTab !== 'all' && (ord.status || '').toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }

      // Filter Modal status
      if (filters.status !== 'all' && (ord.status || '').toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }

      // Filter Modal payment
      if (filters.payment !== 'all' && (ord.paymentMethod || '').toLowerCase() !== filters.payment.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = ord.orderNumber.toLowerCase().includes(query);
        const matchesCustomer = ord.customer.name.toLowerCase().includes(query);
        const matchesPhone = ord.customer.phone.includes(query);
        return matchesId || matchesCustomer || matchesPhone;
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [orders, activeTab, filters, searchQuery, sortDirection]);

  // Paginated Orders
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  // Handlers
  const handleSortToggle = () => {
    setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Order ID,Customer,Phone,Items,Date,Amount,Payment,Status"]
      .concat(filteredOrders.map(o => `${o.orderNumber},${o.customer.name},${o.customer.phone},${o.itemsCount},${o.fullDateTime},${o.amount},${o.paymentMethod},${o.status}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="orders-page-container">
      {/* Page Header */}
      <OrdersHeader
        onExport={handleExport}
        onSort={handleSortToggle}
        onOpenFilter={() => setIsFilterModalOpen(true)}
        sortDirection={sortDirection}
      />

      {/* Filter & Search Bar */}
      <OrdersFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
        }}
        statusCounts={statusCounts}
        onSort={handleSortToggle}
      />

      {/* Main Orders Display: Table on Desktop/Tab, Cards on Mobile */}
      <OrdersTable
        orders={paginatedOrders}
        onSelectOrder={handleOpenOrderDetails}
      />

      <OrdersCards
        orders={isMobile ? filteredOrders : paginatedOrders}
        onSelectOrder={handleOpenOrderDetails}
      />

      {/* Pagination Bar */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemLabel="orders"
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Details Popup Modal for Desktop/Tablet */}
      <OrderDetailsModal
        isOpen={!isMobile && Boolean(selectedOrder)}
        onClose={handleCloseOrderDetails}
        order={selectedOrder}
      />

      {/* Details Bottom Sheet for Mobile */}
      <OrderDetailsSheet
        isOpen={isMobile && Boolean(selectedOrder)}
        onClose={handleCloseOrderDetails}
        order={selectedOrder}
      />

      {/* Filter Modal */}
      <OrdersFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          if (newFilters.status !== 'all') {
            setActiveTab(newFilters.status);
          }
          setCurrentPage(1);
        }}
        currentFilters={filters}
      />

      {/* Floating Circular Filter FAB Button */}
      <button
        type="button"
        className={`orders-floating-filter-fab ${isFabVisible ? 'fab-visible' : 'fab-hidden'} ${filters.status !== 'all' || filters.payment !== 'all' ? 'has-active' : ''}`}
        onClick={() => setIsFilterModalOpen(true)}
        aria-label="Filter Orders"
      >
        <Filter size={20} />
        {(filters.status !== 'all' || filters.payment !== 'all') && (
          <span className="floating-filter-badge" />
        )}
      </button>
    </div>
  );
};

export default OrdersPage;
