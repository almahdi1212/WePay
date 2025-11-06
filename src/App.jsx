import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

      {/* ⚙️ لوحة التحكم */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* الصفحة الرئيسية للوحة التحكم */}
        <Route index element={<DashboardHome />} />

        {/* صفحة الشحنات داخل نفس الـ Layout */}
        <Route path="shipments" element={<DashboardShipments />} />
        
         <Route path="settings" element={<DashboardSettings />} /> {/* ✅ هنا */}


        {/* ✅ يمكن لاحقًا إضافة صفحات أخرى داخل نفس الـ Dashboard */}
        {/* <Route path="settings" element={<DashboardSettings />} /> */}
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
