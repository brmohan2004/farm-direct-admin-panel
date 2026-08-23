import React from 'react';
import './OrderSheetItemsTab.css';

const OrderSheetItemsTab = ({ order }) => {
  if (!order) return null;

  return (
    <div className="order-sheet-card">
      <div className="order-sheet-card-header">
        <h4 className="order-sheet-section-title">
          Order Items ({order.items ? order.items.length : order.itemsCount})
        </h4>
        <button className="order-sheet-link-btn">View All Items</button>
      </div>

      <div className="order-sheet-items-list">
        {(order.items || []).slice(0, 3).map((item) => (
          <div key={item.id} className="order-sheet-item-row">
            <img src={item.image} alt={item.name} className="order-sheet-item-img" />
            <div className="order-sheet-item-details">
              <span className="order-sheet-item-name">{item.name}</span>
              <span className="order-sheet-item-weight">{item.weight}</span>
              <span className="order-sheet-item-unit-price">{item.formattedPrice}</span>
            </div>
            <div className="order-sheet-item-right">
              <span className="order-sheet-item-qty">Qty: {item.quantity}</span>
              <span className="order-sheet-item-total">{item.formattedTotal}</span>
            </div>
          </div>
        ))}
      </div>

      {(order.items || []).length > 3 && (
        <div className="order-sheet-more-items">
          +{(order.items.length - 3)} more items
        </div>
      )}
    </div>
  );
};

export default OrderSheetItemsTab;
