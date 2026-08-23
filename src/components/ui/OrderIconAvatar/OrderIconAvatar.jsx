import React from 'react';
import { ShoppingBag, Clock, Truck, XCircle, CheckCircle } from 'lucide-react';
import './OrderIconAvatar.css';

/**
 * OrderIconAvatar Component
 * Displays a color-coded icon box matching order status.
 *
 * @param {string} status - 'Delivered' | 'Pending' | 'Shipped' | 'Cancelled' | 'Confirmed'
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const OrderIconAvatar = ({ status = 'Delivered', size = 'md', className = '' }) => {
  const normalizedStatus = (status || '').toLowerCase();

  const getIcon = () => {
    switch (normalizedStatus) {
      case 'pending':
        return <Clock size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />;
      case 'shipped':
        return <Truck size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />;
      case 'cancelled':
        return <XCircle size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />;
      case 'confirmed':
        return <CheckCircle size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />;
      case 'delivered':
      default:
        return <ShoppingBag size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />;
    }
  };

  return (
    <div className={`order-icon-avatar order-icon-avatar--${normalizedStatus} order-icon-avatar--${size} ${className}`}>
      {getIcon()}
    </div>
  );
};

export default OrderIconAvatar;
