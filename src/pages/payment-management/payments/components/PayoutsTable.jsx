import React from 'react';
import { Wallet, ChevronRight, Building } from 'lucide-react';
import { StatusBadge, CopyButton } from '../../../../components/ui';
import './PayoutsTable.css';

/**
 * PayoutsTable Component
 * Tabular list of Farmer Payouts for Desktop & Tablet view
 */
const PayoutsTable = ({ payouts, onSelectPayout }) => {
  if (!payouts || payouts.length === 0) {
    return (
      <div className="payouts-table-empty">
        <Wallet size={36} className="empty-icon" />
        <p className="empty-title">No farmer payouts found</p>
        <span className="empty-sub">No payout records match your search criteria.</span>
      </div>
    );
  }

  return (
    <div className="payouts-table-container">
      <table className="payouts-table">
        <thead>
          <tr>
            <th>Payout ID</th>
            <th>Farmer Name</th>
            <th>Bank & Account</th>
            <th>Payout Method</th>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((pwt) => (
            <tr
              key={pwt.id}
              className="payouts-table-row"
              onClick={() => onSelectPayout(pwt)}
            >
              <td>
                <div className="payout-id-cell">
                  <span className="payout-id-text font-bold">{pwt.payoutId}</span>
                  <CopyButton text={pwt.payoutId} size={12} />
                </div>
              </td>

              <td>
                <div className="farmer-cell">
                  <span className="farmer-name font-semibold">{pwt.farmerName}</span>
                  <span className="farmer-email">{pwt.farmerEmail}</span>
                </div>
              </td>

              <td>
                <div className="bank-cell">
                  <div className="bank-line">
                    <Building size={13} className="bank-icon" />
                    <span className="bank-name">{pwt.bankName}</span>
                  </div>
                  <span className="account-no">{pwt.accountNumber}</span>
                </div>
              </td>

              <td>
                <span className="payout-method-badge">{pwt.payoutMethod}</span>
              </td>

              <td>
                <span className="date-text">{pwt.date}</span>
              </td>

              <td>
                <span className="amount-text font-bold">{pwt.amount}</span>
              </td>

              <td>
                <StatusBadge status={pwt.status} size="sm" />
              </td>

              <td className="text-right">
                <button
                  type="button"
                  className="view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPayout(pwt);
                  }}
                >
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayoutsTable;
