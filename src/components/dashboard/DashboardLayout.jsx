import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const location = useLocation();
  const [showShimmer, setShowShimmer] = useState(true);

  // ⚡ تشغيل الوميض عند تحميل الصفحة وعند الانتقال بين الصفحات
  useEffect(() => {
    setShowShimmer(true);
    const timer = setTimeout(() => setShowShimmer(false), 2500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#f8f6f2] text-[#1A1A1A]">
      {/* Sidebar */}
      <aside className="w-20 md:w-72 bg-white border-r border-[#E9AB1D]/10 shadow-sm flex flex-col min-h-screen">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto relative">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-6 pb-4 relative overflow-hidden">
          {/* ✅ خط سفلي ذهبي متدرج مع تأثير الليزر المتحرك */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] rounded-full overflow-hidden">
            <div
              className={`h-full w-full transition-all duration-500 ${
                showShimmer
                  ? "animate-laser-glow bg-gradient-to-r from-[#F5D78B] via-[#E9AB1D] to-[#c98a00]"
                  : "bg-gradient-to-r from-[#F5D78B] via-[#E9AB1D] to-[#c98a00]"
              } opacity-70`}
            ></div>
          </div>

          {/* يسار: عنوان We Pay Dashboard */}
          <div className="hidden md:flex items-center gap-3 ml-auto z-10">
            <span className="text-[#E9AB1D] font-extrabold text-2xl">W</span>
            <span className="font-semibold text-lg">We Pay Dashboard</span>
          </div>

          {/* يمين: الترحيب */}
          <div className="flex items-center gap-4 z-10">
            <div className="text-sm text-gray-600">مرحبًا Admin</div>
            <div className="w-10 h-10 rounded-full bg-[#fff9ef] flex items-center justify-center text-[#E9AB1D] font-semibold shadow-sm">
              WP
            </div>
          </div>
        </div>

        {/* Page content */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-2xl flex-1"
        >
          <Outlet />
        </motion.div>

        {/* ✨ تأثير الليزر الذهبي المتحرك */}
        <style>
          {`
            @keyframes laserGlow {
              0% {
                background: radial-gradient(circle at 50% 50%, rgba(255,230,150,0.9) 0%, rgba(233,171,29,0.7) 25%, rgba(233,171,29,0.2) 50%, transparent 70%);
                box-shadow: 0 0 8px rgba(233,171,29,0.3);
              }
              25% {
                background: radial-gradient(circle at 50% 50%, rgba(255,240,180,1) 0%, rgba(233,171,29,0.8) 20%, rgba(233,171,29,0.3) 50%, transparent 80%);
                box-shadow: 0 0 14px rgba(233,171,29,0.5);
              }
              50% {
                background: radial-gradient(circle at 50% 50%, rgba(255,255,200,1) 0%, rgba(233,171,29,0.8) 25%, rgba(233,171,29,0.3) 55%, transparent 85%);
                box-shadow: 0 0 18px rgba(233,171,29,0.6);
              }
              75% {
                background: radial-gradient(circle at 50% 50%, rgba(255,240,180,1) 0%, rgba(233,171,29,0.7) 20%, rgba(233,171,29,0.25) 50%, transparent 80%);
                box-shadow: 0 0 14px rgba(233,171,29,0.45);
              }
              100% {
                background: radial-gradient(circle at 50% 50%, rgba(255,230,150,0.9) 0%, rgba(233,171,29,0.6) 25%, rgba(233,171,29,0.2) 50%, transparent 70%);
                box-shadow: 0 0 8px rgba(233,171,29,0.3);
              }
            }

            .animate-laser-glow {
              animation: laserGlow 2.5s ease-out;
              background-size: 200% 100%;
              filter: drop-shadow(0 0 6px rgba(233,171,29,0.4));
            }
          `}
        </style>
      </main>
    </div>
  );
}
