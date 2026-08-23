import React from 'react';
import { Package, Calendar, ChevronRight } from 'lucide-react';
import { StatusBadge, OrderIconAvatar } from '../../../../components/ui';
import './OrdersCards.css';

/**
 * OrdersCards Component
 * Mobile-optimized stacked card layout for orders list matching design image 2
 */
const OrdersCards = ({ orders = [], onSelectOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="orders-cards-empty">
        <p>No orders found matching criteria.</p>
      </div>
    );
  }

  return (
    <div className="orders-cards-container">
      {orders.map((order) => (
        <div
          key={order.id}
          className="orders-card-item"
          onClick={() => onSelectOrder(order)}
          role="button"
          tabIndex={0}
        >
          <div className="orders-card-header-row">
            <div className="orders-card-left">
              <OrderIconAvatar status={order.status} size="md" />
              <div className="orders-card-title-group">
                <span className="orders-card-ord-number">{order.orderNumber}</span>
                <span className="orders-card-customer-name">{order.customer.name}</span>
              </div>
            </div>

            <div className="orders-card-right">
              <StatusBadge status={order.status} size="sm" />
              <span className="orders-card-amount">{order.formattedAmount}</span>
            </div>

            <ChevronRight size={18} className="orders-card-chevron" />
          </div>

          <div className="orders-card-details-rows">
            <div className="orders-card-detail-item">
              <Package size={14} className="orders-card-detail-icon" />
              <span>{order.itemsCount} Items</span>
            </div>
            <div className="orders-card-detail-item">
              <Calendar size={14} className="orders-card-detail-icon" />
              <span>{order.fullDateTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersCards;
