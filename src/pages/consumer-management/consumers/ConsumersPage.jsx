import React, { useState, useEffect, useMemo } from 'react';
import {
  ConsumersHeader,
  ConsumersStatCards,
  ConsumersFilterBar,
  ConsumersTable,
  ConsumersCards,
  ConsumerDetailsModal,
  AddConsumerModal,
  ConsumersFilterModal,
} from './components';
import { ConsumerDetailsSheet } from '../consumer-details-sheet';
import { Pagination } from '../../../components/ui';
import { mockConsumers } from './mockConsumers';
import './ConsumersPage.css';

/**
 * ConsumersPage Component
 * Main page for consumer management across mobile, tablet, and desktop views.
 */
const ConsumersPage = () => {
  const [consumers, setConsumers] = useState(mockConsumers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stats calculation
  const stats = useMemo(() => {
    const activeCount = consumers.filter((c) => c.status === 'Active').length;
    const inactiveCount = consumers.filter((c) => c.status === 'Inactive').length;
    return {
      total: 1248,
      active: 1096,
      inactive: 152,
      newThisMonth: 48,
    };
  }, [consumers]);

  // Filtering logic
  const filteredConsumers = useMemo(() => {
    return consumers.filter((cons) => {
      // Status filter
      if (filters.status !== 'all' && cons.status !== filters.status) {
        return false;
      }

      // Location filter
      if (filters.location !== 'all' && !cons.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = cons.name.toLowerCase().includes(query);
        const matchesPhone = cons.phone.includes(query);
        const matchesEmail = cons.email.toLowerCase().includes(query);
        const matchesLoc = cons.location.toLowerCase().includes(query);
        return matchesName || matchesPhone || matchesEmail || matchesLoc;
      }

      return true;
    });
  }, [consumers, filters, searchQuery]);

  // Pagination
  const totalItems = filteredConsumers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedConsumers = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredConsumers.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredConsumers, currentPage, itemsPerPage]);

  // Actions
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Consumer ID,Name,Phone,Email,Location,Status,Joined On,Total Orders,Total Spent"]
      .concat(filteredConsumers.map(c => `${c.id},${c.name},${c.phone},${c.email},${c.location},${c.status},${c.joinedOn},${c.totalOrders},${c.formattedTotalSpent}`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `consumers_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddConsumer = (newConsumer) => {
    setConsumers((prev) => [newConsumer, ...prev]);
  };

  return (
    <div className="consumers-page-container">
      {/* Header */}
      <ConsumersHeader onAddConsumer={() => setIsAddModalOpen(true)} />

      {/* Stats Cards */}
      <ConsumersStatCards stats={stats} />

      {/* Filter Bar */}
      <ConsumersFilterBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onOpenFilter={() => setIsFilterModalOpen(false || true)}
        onExport={handleExport}
      />

      {/* Desktop/Tablet Table View */}
      <ConsumersTable
        consumers={paginatedConsumers}
        onSelectConsumer={setSelectedConsumer}
      />

      {/* Mobile Stacked Cards View */}
      <ConsumersCards
        consumers={isMobile ? filteredConsumers : paginatedConsumers}
        onSelectConsumer={setSelectedConsumer}
      />

      {/* Pagination Bar */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemLabel="consumers"
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />
      )}

      {/* Consumer Details Popup Modal (Desktop/Tab) */}
      <ConsumerDetailsModal
        isOpen={!isMobile && Boolean(selectedConsumer)}
        onClose={() => setSelectedConsumer(null)}
        consumer={selectedConsumer}
      />

      {/* Consumer Details Bottom Sheet (Mobile) */}
      <ConsumerDetailsSheet
        isOpen={isMobile && Boolean(selectedConsumer)}
        onClose={() => setSelectedConsumer(null)}
        consumer={selectedConsumer}
      />

      {/* Add Consumer Form Modal */}
      <AddConsumerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddConsumer={handleAddConsumer}
      />

      {/* Filter Modal */}
      <ConsumersFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
        currentFilters={filters}
      />
    </div>
  );
};

export default ConsumersPage;
