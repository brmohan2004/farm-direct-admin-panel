import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Sidebar from '../components/navigation/Sidebar';
import MobileBottomNav from '../components/navigation/MobileBottomNav';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
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
