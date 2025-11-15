import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import InstallPWA from "./components/InstallPWA";
import BottomNav from "./components/BottomNav";

// 🟡 الصفحات العامة
import Home from "./pages/Home";
import Track from "./pages/Track";
import Calculator from "./pages/Calculator";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

// 🟠 لوحة التحكم
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardShipments from "./pages/dashboard/DashboardShipments";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardUpdates from "./pages/dashboard/DashboardUpdates";
import Users from "./pages/dashboard/users";

// 🔐 تسجيل الدخول
import Login from "./pages/Login";

export default function App() {
  const location = useLocation();

  // 📌 هل نحن داخل لوحة التحكم؟
  const isDashboard = location.pathname.startsWith("/dashboard");

  // 📌 هل نحن في صفحة تسجيل الدخول؟
  const isLogin = location.pathname === "/login";

  // 📌 الصفحات العامة فقط = بدون Dashboard + بدون Login
  const showPublicUI = !isDashboard && !isLogin;

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-20">

      {/* 🔥 Popup تثبيت التطبيق — يظهر فقط في الصفحات العامة */}
      {showPublicUI && <InstallPWA />}

      {/* 🔹 المسارات */}
      <Routes>

        {/* 🏠 الصفحات العامة */}
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<Track />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/support" element={<Support />} />

        {/* 🔑 تسجيل الدخول */}
        <Route path="/login" element={<Login />} />

        {/* ⚙️ لوحة التحكم */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="shipments" element={<DashboardShipments />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="updates" element={<DashboardUpdates />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 🚫 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* 🔥 شريط التطبيق السفلي — يظهر فقط في الصفحات العامة */}
      {showPublicUI && <BottomNav />}
    </div>
  );
}
