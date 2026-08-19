import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import RequireAuth from '../components/admin/RequireAuth';

import Home from '../pages/Home';
import Service from '../pages/Service';
import Gallery from '../pages/Gallery';

import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProfile from '../pages/admin/AdminProfile';
import AdminLayanan from '../pages/admin/AdminLayanan';
import AdminGaleri from '../pages/admin/AdminGaleri';
import AdminFooter from '../pages/admin/AdminFooter';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="layanan" element={<Service />} />
        <Route path="galeri" element={<Gallery />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="layanan" element={<AdminLayanan />} />
        <Route path="galeri" element={<AdminGaleri />} />
        <Route path="footer" element={<AdminFooter />} />
      </Route>

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
