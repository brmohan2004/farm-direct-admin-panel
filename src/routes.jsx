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
  FarmerVerificationPage,
  FarmersPage,
  FarmerDetailsPage,
  StockInboxPage,
  StockRequestDetailsPage,
  InventoryPage,
  ProductsPage,
  AddProductPage,
  ProductDetailsPage,
  CategoriesPage,
  ConsumersPage,
  ConsumerDetailsPage,
  OrdersPage,
  OrderDetailsPage,
  PaymentsPage,
  PaymentDetailsPage,
  PayoutsPage,
  PayoutDetailsPage,
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
          <Route path="/farmer-management/verification" element={<FarmerVerificationPage />} />
          <Route path="/farmer-management/farmers" element={<FarmersPage />} />
          <Route path="/farmer-management/farmers/:id" element={<FarmerDetailsPage />} />
          <Route path="/farmer-management/farmer-details" element={<FarmerDetailsPage />} />
          <Route path="/farmer-management/farmer-details/:id" element={<FarmerDetailsPage />} />
          
          {/* Stock Management */}
          <Route path="/stock-management/inbox" element={<StockInboxPage />} />
          <Route path="/stock-management/requests/:id" element={<StockRequestDetailsPage />} />
          <Route path="/stock-management/inventory" element={<InventoryPage />} />

          {/* Product Management */}
          <Route path="/product-management/products" element={<ProductsPage />} />
          <Route path="/product-management/add" element={<AddProductPage />} />
          <Route path="/product-management/products/:id" element={<ProductDetailsPage />} />
          <Route path="/product-management/categories" element={<CategoriesPage />} />

          {/* Consumer Management */}
          <Route path="/consumer-management/consumers" element={<ConsumersPage />} />
          <Route path="/consumer-management/consumers/:id" element={<ConsumerDetailsPage />} />

          {/* Order Management */}
          <Route path="/order-management/orders" element={<OrdersPage />} />
          <Route path="/order-management/orders/:id" element={<OrderDetailsPage />} />

          {/* Payment / Transactions Management */}
          <Route path="/transactions" element={<Navigate to="/payment-management/payments" replace />} />
          <Route path="/payment-management/payments" element={<PaymentsPage />} />
          <Route path="/payment-management/payments/:id" element={<PaymentDetailsPage />} />

          {/* Farmer Payouts */}
          <Route path="/farmer-payouts/payouts" element={<PayoutsPage />} />
          <Route path="/farmer-payouts/payouts/:id" element={<PayoutDetailsPage />} />

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
