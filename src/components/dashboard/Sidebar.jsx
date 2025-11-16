import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaNewspaper,
  FaCogs,
  FaUsers,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const username = localStorage.getItem("username");

  const items = [
    { to: "/dashboard", label: "اللوحة", icon: <FaTachometerAlt /> },
    { to: "/dashboard/shipments", label: "الشحنات", icon: <FaBoxOpen /> },
    { to: "/dashboard/updates", label: "آخر التحديثات", icon: <FaNewspaper /> },
    { to: "/dashboard/settings", label: "الإعدادات العامة", icon: <FaCogs /> },
    {
      action: handleLogout,
      label: "تسجيل الخروج",
      icon: <FaSignOutAlt />,
      isLogout: true,
    },
  ];

  if (username === "admin") {
    items.splice(4, 0, {
      to: "/dashboard/users",
      label: "إدارة المستخدمين",
      icon: <FaUsers />,
    });
  }

  return (
    <nav className="flex flex-col justify-between h-full min-h-screen px-5 py-10 bg-white">

      {/* ====== Logo Section ====== */}
<div className="mt-14 mb-10 flex flex-col items-center md:items-start">
  <div className="flex items-center gap-0.1">
  <img
    src="/favicon-transparent.png"
    alt="Logo"
    className="w-16 h-16 object-contain relative top-[4px]"
  />

  <div className="hidden md:block text-3xl font-extrabold text-[#1A1A1A] tracking-wide">
    We Pay
  </div>
</div>

</div>

      {/* زر إضافة شحنة */}
      <button
        onClick={() => navigate("/dashboard/shipments?add=true")}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 font-semibold text-lg mb-8"
      >
        <FaPlusCircle className="text-xl" />
        <span className="hidden md:inline">إضافة شحنة جديدة</span>
      </button>

      {/* الروابط */}
      <div className="flex-1 flex flex-col justify-start mt-4 space-y-6">
        {items.map((it) =>
          it.action ? (
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

      <footer className="mt-10 text-xs text-gray-400 text-center border-t border-gray-100 pt-4 w-full">
        © {new Date().getFullYear()} We Pay
      </footer>
    </nav>
  );
}
