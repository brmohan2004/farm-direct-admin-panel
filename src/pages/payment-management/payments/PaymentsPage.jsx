import React, { useState, useEffect, useMemo } from 'react';
import {
  TransactionsHeader,
  TransactionsStatCards,
  TransactionsFilterBar,
  PaymentsTable,
  PaymentsCards,
  PayoutsTable,
  PayoutsCards,
  PaymentDetailsModal,
  PayoutDetailsModal,
  PaymentDetailsSheet,
  PayoutDetailsSheet,
} from './components';
import { Pagination } from '../../../components/ui';
import { mockPayments, mockPayouts, mockTransactionStats } from './mockTransactions';
import './PaymentsPage.css';

/**
 * PaymentsPage / TransactionsPage Component
 * Unified single-page experience for Customer Payments & Farmer Payouts
 */
const PaymentsPage = ({ defaultTab = 'payments' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'payments' | 'payouts'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selected item for details
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPayout, setSelectedPayout] = useState(null);

  // Screen width state to determine sheet vs modal
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter payments
  const filteredPayments = useMemo(() => {
    return mockPayments.filter((pay) => {
      const matchesSearch =
        pay.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pay.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All' ||
        pay.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  // Filter payouts
  const filteredPayouts = useMemo(() => {
    return mockPayouts.filter((pwt) => {
      const matchesSearch =
        pwt.payoutId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwt.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwt.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pwt.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'All' ||
        pwt.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedStatus('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedStatus('All');
  };

  const handleExport = () => {
    alert(`Exporting ${activeTab === 'payments' ? 'Customer Payments' : 'Farmer Payouts'} report as CSV...`);
  };

  return (
    <div className="page-container transactions-page-container">
      {/* 1. Header with Tab Switcher */}
      <TransactionsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />

      {/* 2. Metric Stat Cards */}
      <TransactionsStatCards stats={mockTransactionStats} />

      {/* 3. Search & Filter Bar */}
      <TransactionsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        activeTab={activeTab}
      />

      {/* 4. Active Tab Content Listing */}
      {activeTab === 'payments' ? (
        <>
          {/* Desktop/Tablet Table view */}
          <div className="desktop-tab-view">
            <PaymentsTable
              payments={filteredPayments}
              onSelectPayment={(pay) => setSelectedPayment(pay)}
            />
          </div>

          {/* Mobile Cards Stack view */}
          <div className="mobile-view">
            <PaymentsCards
              payments={filteredPayments}
              onSelectPayment={(pay) => setSelectedPayment(pay)}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalEntries={filteredPayments.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      ) : (
        <>
          {/* Desktop/Tablet Table view */}
          <div className="desktop-tab-view">
            <PayoutsTable
              payouts={filteredPayouts}
              onSelectPayout={(pwt) => setSelectedPayout(pwt)}
            />
          </div>

          {/* Mobile Cards Stack view */}
          <div className="mobile-view">
            <PayoutsCards
              payouts={filteredPayouts}
              onSelectPayout={(pwt) => setSelectedPayout(pwt)}
            />
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalEntries={filteredPayouts.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      {/* 5. Responsive Detail Views (Sheet on Mobile, Popup Modal on Desktop/Tab) */}
      {isMobile ? (
        <>
          <PaymentDetailsSheet
            isOpen={!!selectedPayment}
            onClose={() => setSelectedPayment(null)}
            payment={selectedPayment}
          />
          <PayoutDetailsSheet
            isOpen={!!selectedPayout}
            onClose={() => setSelectedPayout(null)}
            payout={selectedPayout}
          />
        </>
      ) : (
        <>
          <PaymentDetailsModal
            isOpen={!!selectedPayment}
            onClose={() => setSelectedPayment(null)}
            payment={selectedPayment}
          />
          <PayoutDetailsModal
            isOpen={!!selectedPayout}
            onClose={() => setSelectedPayout(null)}
            payout={selectedPayout}
          />
        </>
      )}
    </div>
  );
};

export default PaymentsPage;
