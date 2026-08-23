import React from 'react';
import { IndianRupee, Wallet, Clock, CheckCircle2 } from 'lucide-react';
import './TransactionsStatCards.css';

/**
 * TransactionsStatCards Component
 * Metric stat cards for Payments and Payouts summary.
 * Displays as a compact 4-card single row on mobile screens (matching Dashboard style).
 */
const TransactionsStatCards = ({ stats }) => {
  return (
    <div className="transactions-stats-grid">
      {/* Card 1: Total Received Payments */}
      <div className="trans-stat-card trans-stat-card--green">
        <div className="trans-stat-icon-bg icon-bg--green">
          <IndianRupee size={15} />
        </div>
        <span className="trans-stat-label">Total Payments</span>
        <h3 className="trans-stat-value">{stats.totalPayments}</h3>
        <span className="trans-stat-subtext">{stats.totalPaymentsCount} settled</span>
      </div>

      {/* Card 2: Total Farmer Payouts */}
      <div className="trans-stat-card trans-stat-card--blue">
        <div className="trans-stat-icon-bg icon-bg--blue">
          <Wallet size={15} />
        </div>
        <span className="trans-stat-label">Farmer Payouts</span>
        <h3 className="trans-stat-value">{stats.totalPayouts}</h3>
        <span className="trans-stat-subtext">{stats.totalPayoutsCount} completed</span>
      </div>

      {/* Card 3: Pending Payouts */}
      <div className="trans-stat-card trans-stat-card--orange">
        <div className="trans-stat-icon-bg icon-bg--orange">
          <Clock size={15} />
        </div>
        <span className="trans-stat-label">Pending Payouts</span>
        <h3 className="trans-stat-value">{stats.pendingPayouts}</h3>
        <span className="trans-stat-subtext">{stats.pendingCount} pending</span>
      </div>

      {/* Card 4: Success Rate */}
      <div className="trans-stat-card trans-stat-card--purple">
        <div className="trans-stat-icon-bg icon-bg--purple">
          <CheckCircle2 size={15} />
        </div>
        <span className="trans-stat-label">Success Rate</span>
        <h3 className="trans-stat-value">{stats.successRate}</h3>
        <span className="trans-stat-subtext">High uptime</span>
      </div>
    </div>
  );
};

export default TransactionsStatCards;
