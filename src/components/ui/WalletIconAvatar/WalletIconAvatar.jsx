import React from 'react';
import { Wallet, CreditCard, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import './WalletIconAvatar.css';

/**
 * WalletIconAvatar Component
 * Styled wallet/payment icon box matching design image cards.
 */
const WalletIconAvatar = ({ type = 'wallet', variant = 'success', size = 'md' }) => {
  const renderIcon = () => {
    switch (type) {
      case 'credit-card':
        return <CreditCard size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      case 'incoming':
        return <ArrowDownRight size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      case 'outgoing':
        return <ArrowUpRight size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
      case 'wallet':
      default:
        return <Wallet size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />;
    }
  };

  return (
    <div className={`wallet-avatar-root wallet-avatar--${variant} wallet-avatar--${size}`}>
      {renderIcon()}
    </div>
  );
};

export default WalletIconAvatar;
