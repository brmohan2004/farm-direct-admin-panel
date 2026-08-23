import React from 'react';
import { Eye } from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './OrdersTable.css';

/**
 * OrdersTable Component
 * Table layout for displaying orders on Desktop & Tablet viewports
 */
const OrdersTable = ({ orders = [], onSelectOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="orders-table-empty">
        <p>No orders match the current filter or search criteria.</p>
      </div>
    );
  }

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th className="orders-th-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="orders-table-row">
              <td className="orders-td-id">
                <div className="orders-id-cell">
                  <OrderIconAvatar status={order.status} size="sm" />
                  <span className="orders-id-number">{order.orderNumber}</span>
                </div>
              </td>
              <td className="orders-td-customer">
                <div className="orders-customer-cell">
                  <span className="orders-customer-name">{order.customer.name}</span>
                  <span className="orders-customer-phone">{order.customer.phone}</span>
                </div>
              </td>
              <td className="orders-td-items">
                <span className="orders-items-count">{order.itemsCount} Items</span>
              </td>
              <td className="orders-td-date">
                <div className="orders-date-cell">
                  <span className="orders-date-text">{order.orderDate}</span>
                  <span className="orders-time-text">{order.orderTime}</span>
                </div>
              </td>
              <td className="orders-td-amount">
                <span className="orders-amount-text">{order.formattedAmount}</span>
              </td>
              <td className="orders-td-payment">
                <StatusBadge status={order.paymentMethod} showDot={false} size="sm" />
              </td>
              <td className="orders-td-status">
                <StatusBadge status={order.status} size="sm" />
              </td>
              <td className="orders-td-actions">
                <button
                  className="orders-view-action-btn"
                  onClick={() => onSelectOrder(order)}
                  title={`View details for ${order.orderNumber}`}
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
