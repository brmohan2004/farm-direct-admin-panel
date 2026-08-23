import React from 'react';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';
import './OrderSheetTimelineTab.css';

const OrderSheetTimelineTab = ({ order }) => {
  if (!order) return null;

  const timelineSteps = order.timeline || [
    { step: 'Order Placed', time: order.orderDate + ', 09:15 AM', completed: true },
    { step: 'Confirmed', time: order.orderDate + ', 09:20 AM', completed: true },
    { step: 'Shipped', time: order.orderDate + ', 04:30 PM', completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { step: 'Delivered', time: order.orderDate + ', 06:10 PM', completed: order.status === 'Delivered' },
  ];

  return (
    <div className="order-sheet-card">
      <h4 className="order-sheet-section-title">Order Status Timeline</h4>
      <div className="order-sheet-timeline">
        {timelineSteps.map((step, idx) => {
          const isCompleted = step.completed;
          return (
            <div key={idx} className={`order-sheet-timeline-node ${isCompleted ? 'order-sheet-timeline-node--completed' : ''}`}>
              <div className="order-sheet-node-icon">
                {idx === 0 && <ShoppingBag size={14} />}
                {idx === 1 && <Package size={14} />}
                {idx === 2 && <Truck size={14} />}
                {idx === 3 && <CheckCircle size={14} />}
              </div>
              <span className="order-sheet-node-label">{step.step}</span>
              <span className="order-sheet-node-time">{step.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderSheetTimelineTab;
