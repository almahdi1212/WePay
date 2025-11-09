import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// 🟡 الصفحات العامة
import Home from "./pages/Home";
import Track from "./pages/Track";
import Calculator from "./pages/Calculator";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

// 🟠 لوحة التحكم
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardShipments from "./pages/dashboard/DashboardShipments";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardUpdates from "./pages/dashboard/DashboardUpdates";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      {/* 🏠 الصفحات العامة */}
      <Route
        path="/"
        element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Home />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/track"
        element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Track />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/calculator"
        element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Calculator />
            </main>
            <Footer />
          </div>
        }
      />
      <Route
        path="/support"
        element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Support />
            </main>
            <Footer />
          </div>
        }
      />

      {/* 🧱 تسجيل الدخول */}
      <Route path="/login" element={<Login />} />

      {/* ⚙️ لوحة التحكم (محميّة) */}
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
      </Route>

      {/* 🚫 صفحة الخطأ */}
      <Route
        path="*"
        element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <NotFound />
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}
