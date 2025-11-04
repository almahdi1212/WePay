import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* الشعار */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
            style={{
              background: "#fff",
              border: "2px solid #E9AB1D",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <span
              style={{
                color: "#E9AB1D",
                fontWeight: 900,
                fontSize: "1.8rem",
                lineHeight: "1",
              }}
            >
              W
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            We <span className="text-[#E9AB1D]">Pay</span>
          </h1>
        </div>

        {/* روابط الصفحة (للكمبيوتر) */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "الرئيسية", path: "/" },
            { name: "تتبع الشحنة", path: "/track" },
            { name: "حاسبة الأسعار", path: "/calculator" },
            { name: "الدعم", path: "/support" },
          ].map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="text-gray-700 font-medium text-sm hover:text-[#E9AB1D] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}

          {/* زر ابدأ الآن */}
          <Link
            to="/track"
            className="bg-[#E9AB1D] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#d49616] transition-all duration-200"
          >
            ابدأ الآن
          </Link>
        </nav>

        {/* القائمة الجانبية للموبايل */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/track"
            className="bg-[#E9AB1D] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#d49616] transition"
          >
            ابدأ
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border rounded text-gray-700 border-gray-200"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <nav className="flex flex-col py-3 text-center">
            {[
              { name: "الرئيسية", path: "/" },
              { name: "تتبع الشحنة", path: "/track" },
              { name: "حاسبة الأسعار", path: "/calculator" },
              { name: "الدعم", path: "/support" },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="py-2 text-gray-700 font-medium hover:bg-gray-50 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
