import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import MobileBottomNav from '../components/navigation/MobileBottomNav';

const AdminLayout = () => {
  const location = useLocation();

  // Check if current page is Farmer Details page
  const isFarmerDetailsPage =
    location.pathname.includes('/farmer-details') ||
    (location.pathname.startsWith('/farmer-management/farmers/') &&
      location.pathname.split('/').filter(Boolean).length > 2);

  return (
    <div className={`admin-layout ${isFarmerDetailsPage ? 'hide-mobile-header-nav' : ''}`}>
      <Header />
      <div className="admin-body">
        <Sidebar />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default AdminLayout;
