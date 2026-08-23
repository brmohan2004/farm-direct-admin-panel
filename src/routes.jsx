/**
 * Application Routes Configuration
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout, AdminLayout } from './layouts';

// Pages
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  DashboardPage,
  FarmerRequestsPage,
  FarmersPage,
  FarmerDetailsSheet,
  StockInboxPage,
  ProductsPage,
  AddProductPage,
  ProductDetailsSheet,
  CategoriesPage,
  ConsumersPage,
  ConsumerDetailsSheet,
  OrdersPage,
  OrderDetailsSheet,
  PaymentsPage,
  PaymentDetailsSheet,
  PayoutsPage,
  PayoutDetailsSheet,
  NotificationsPage,
  SettingsPage
} from './pages';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Farmer Management */}
          <Route path="/farmer-management/requests" element={<FarmerRequestsPage />} />
          <Route path="/farmer-management/verification" element={<Navigate to="/farmer-management/requests" replace />} />
          <Route path="/farmer-management/farmers" element={<FarmersPage />} />
          <Route path="/farmer-management/farmers/:id" element={<FarmerDetailsSheet isOpen={true} />} />
          <Route path="/farmer-management/farmer-details" element={<FarmerDetailsSheet isOpen={true} />} />
          <Route path="/farmer-management/farmer-details/:id" element={<FarmerDetailsSheet isOpen={true} />} />
          
          {/* Stock Management */}
          <Route path="/stock-management/inbox" element={<StockInboxPage />} />
          <Route path="/stock-management/inventory" element={<Navigate to="/product-management/products" replace />} />

          {/* Product Management */}
          <Route path="/product-management/products" element={<ProductsPage />} />
          <Route path="/product-management/add" element={<AddProductPage />} />
          <Route path="/product-management/products/:id" element={<ProductDetailsSheet isOpen={true} />} />
          <Route path="/product-management/categories" element={<CategoriesPage />} />

          {/* Consumer Management */}
          <Route path="/consumers" element={<Navigate to="/consumer-management/consumers" replace />} />
          <Route path="/consumer-management/consumers" element={<ConsumersPage />} />
          <Route path="/consumer-management/consumers/:id" element={<ConsumerDetailsSheet isOpen={true} />} />
          <Route path="/consumer-management/consumer-details" element={<Navigate to="/consumer-management/consumers" replace />} />
          <Route path="/consumer-details" element={<Navigate to="/consumer-management/consumers" replace />} />
          <Route path="/consumer-details/:id" element={<ConsumerDetailsSheet isOpen={true} />} />

          {/* Order Management */}
          <Route path="/orders" element={<Navigate to="/order-management/orders" replace />} />
          <Route path="/order-management/orders" element={<OrdersPage />} />
          <Route path="/order-management/orders/:id" element={<OrderDetailsSheet isOpen={true} />} />
          <Route path="/order-details" element={<Navigate to="/order-management/orders" replace />} />
          <Route path="/order-details/:id" element={<OrderDetailsSheet isOpen={true} />} />

          {/* Payment / Transactions Management */}
          <Route path="/transactions" element={<Navigate to="/payment-management/payments" replace />} />
          <Route path="/payment-management/payments" element={<PaymentsPage />} />
          <Route path="/payment-management/payments/:id" element={<PaymentDetailsSheet isOpen={true} />} />

          {/* Farmer Payouts */}
          <Route path="/farmer-payouts/payouts" element={<PayoutsPage />} />
          <Route path="/farmer-payouts/payouts/:id" element={<PayoutDetailsSheet isOpen={true} />} />

          {/* Notifications & Settings */}
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
