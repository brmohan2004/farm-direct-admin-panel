import React from 'react';
import { CreditCard, Wallet, Download, RefreshCw } from 'lucide-react';
import './TransactionsHeader.css';

/**
 * TransactionsHeader Component
 * Page header with active view tab toggle (Customer Payments vs Farmer Payouts)
 */
const TransactionsHeader = ({ activeTab, onTabChange, onRefresh, onExport }) => {
  return (
    <div className="transactions-header-root">
      <div className="transactions-header-left">
        <h1 className="transactions-title">Transactions & Payouts</h1>
        <p className="transactions-subtitle">
          Monitor customer order payments, transaction history, and farmer payout settlements in real-time.
        </p>
      </div>

      <div className="transactions-header-right">
        {/* View Switcher Tabs */}
        <div className="transactions-view-tabs">
          <button
            type="button"
            className={`transactions-view-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => onTabChange('payments')}
          >
            <CreditCard size={16} />
            <span>Customer Payments</span>
          </button>
          <button
            type="button"
            className={`transactions-view-btn ${activeTab === 'payouts' ? 'active' : ''}`}
            onClick={() => onTabChange('payouts')}
          >
            <Wallet size={16} />
            <span>Farmer Payouts</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="transactions-actions">
          <button
            type="button"
            className="transactions-btn-outline"
            onClick={onRefresh}
            title="Refresh Data"
          >
            <RefreshCw size={15} />
            <span className="btn-text">Refresh</span>
          </button>
          <button
            type="button"
            className="transactions-btn-primary"
            onClick={onExport}
          >
            <Download size={15} />
            <span className="btn-text">Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsHeader;
