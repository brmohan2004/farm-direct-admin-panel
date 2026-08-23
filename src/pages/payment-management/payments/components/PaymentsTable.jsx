import React from 'react';
import { Eye, CreditCard, ChevronRight } from 'lucide-react';
import { StatusBadge, CopyButton } from '../../../../components/ui';
import './PaymentsTable.css';

/**
 * PaymentsTable Component
 * Tabular display of Customer Payments for Desktop & Tablet view
 */
const PaymentsTable = ({ payments, onSelectPayment }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="payments-table-empty">
        <CreditCard size={36} className="empty-icon" />
        <p className="empty-title">No payments found</p>
        <span className="empty-sub">Try searching with a different term or filter.</span>
      </div>
    );
  }

  return (
    <div className="payments-table-container">
      <table className="payments-table">
        <thead>
          <tr>
            <th>Order & Transaction ID</th>
            <th>Customer Name</th>
            <th>Payment Method</th>
            <th>Date & Time</th>
            <th>Amount</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr
              key={pay.id}
              className="payments-table-row"
              onClick={() => onSelectPayment(pay)}
            >
              <td>
                <div className="order-txn-cell">
                  <span className="order-no font-bold">{pay.orderId}</span>
                  <div className="txn-id-row">
                    <span className="txn-id">{pay.transactionId}</span>
                    <CopyButton text={pay.transactionId} size={12} />
                  </div>
                </div>
              </td>

              <td>
                <div className="customer-cell">
                  <span className="customer-name font-semibold">{pay.customerName}</span>
                  <span className="customer-email">{pay.customerEmail}</span>
                </div>
              </td>

              <td>
                <div className="method-badge">
                  <CreditCard size={13} className="method-icon" />
                  <span>{pay.paymentMethod}</span>
                </div>
              </td>

              <td>
                <span className="date-text">{pay.date}</span>
              </td>

              <td>
                <span className="amount-text font-bold">{pay.amount}</span>
              </td>

              <td>
                <StatusBadge status={pay.status} size="sm" />
              </td>

              <td className="text-right">
                <button
                  type="button"
                  className="view-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPayment(pay);
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

export default PaymentsTable;
