import React from 'react';
import PaymentsPage from '../../payment-management/payments/PaymentsPage';

/**
 * PayoutsPage Component
 * Renders the unified Transactions Page with 'payouts' as default tab.
 */
const PayoutsPage = () => {
  return <PaymentsPage defaultTab="payouts" />;
};

export default PayoutsPage;
