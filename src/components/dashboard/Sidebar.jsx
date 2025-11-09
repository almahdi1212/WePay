import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaNewspaper,
  FaCogs,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // ✅ الأقسام بالترتيب المطلوب
  const items = [
    { to: "/dashboard", label: "اللوحة", icon: <FaTachometerAlt /> },
    { to: "/dashboard/shipments", label: "الشحنات", icon: <FaBoxOpen /> },
    { to: "/dashboard/updates", label: "آخر التحديثات", icon: <FaNewspaper /> },
    { to: "/dashboard/settings", label: "الإعدادات العامة", icon: <FaCogs /> },
    { to: "/dashboard/users", label: "إدارة المستخدمين", icon: <FaUsers /> }, // 👈 الآن أسفل الإعدادات العامة
    { action: handleLogout, label: "تسجيل الخروج", icon: <FaSignOutAlt />, isLogout: true },
  ];

  return (
    <nav className="flex flex-col justify-between h-full min-h-screen px-5 py-10 bg-white">
      {/* ====== Logo Section ====== */}
      <div className="mt-14 mb-16 flex flex-col items-center md:items-start">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] text-white rounded-xl w-14 h-14 flex items-center justify-center text-3xl font-extrabold shadow-md">
            W
          </div>
          <div className="hidden md:block text-3xl font-extrabold text-[#1A1A1A] tracking-wide">
            We Pay
          </div>
        </div>
      </div>

      {/* ====== Navigation Links ====== */}
      <div className="flex-1 flex flex-col justify-start mt-6 space-y-6">
        {items.map((it) =>
          it.action ? (
            // 🔴 زر تسجيل الخروج
            <button
              key={it.label}
              onClick={it.action}
              className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-[17px] font-medium text-gray-600 hover:bg-[#fffaf0] hover:text-red-600 hover:scale-[1.02]"
            >
              <div className="text-2xl text-red-500 min-w-[32px] transition-transform group-hover:scale-110">
                {it.icon}
              </div>
              <span className="hidden md:inline">{it.label}</span>
            </button>
          ) : (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/dashboard"}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 text-[17px] font-medium ${
                  isActive
                    ? "bg-[#fff9ef] border border-[#E9AB1D]/40 shadow-md text-[#1A1A1A] font-semibold"
                    : "text-gray-600 hover:bg-[#fffaf0] hover:text-[#E9AB1D]"
                }`
              }
            >
              <div className="text-2xl text-[#E9AB1D] min-w-[32px] transition-transform group-hover:scale-110">
                {it.icon}
              </div>
              <span className="hidden md:inline">{it.label}</span>
            </NavLink>
          )
        )}
      </div>

      {/* ====== Footer Section ====== */}
      <footer className="mt-10 text-xs text-gray-400 text-center border-t border-gray-100 pt-4 w-full">
        © {new Date().getFullYear()} We Pay
      </footer>
    </nav>
  );
}
