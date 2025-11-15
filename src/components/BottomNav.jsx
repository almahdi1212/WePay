import { NavLink } from "react-router-dom";
import { Home, Calculator, Headset, Truck } from "lucide-react";

export default function BottomNav() {
  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-50 
        bg-white/95 backdrop-blur-md
        shadow-[0_-2px_12px_rgba(0,0,0,0.06)]
        border-t border-[#E9AB1D]/15
      "
      style={{ height: "58px" }} // 🔥 ارتفاع أصغر للموبايل
    >
      <div className="flex justify-around items-center h-full px-2">

        <NavItem to="/" label="الرئيسية" icon={<Home size={20} />} />
        <NavItem to="/track" label="تتبع" icon={<Truck size={20} />} />
        <NavItem to="/calculator" label="حاسبة" icon={<Calculator size={20} />} />
        <NavItem to="/support" label="الدعم" icon={<Headset size={20} />} />

      </div>
    </nav>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          flex flex-col items-center justify-center 
          transition-all duration-200 
          ${isActive ? "text-[#E9AB1D]" : "text-gray-500"}
        `
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`
              flex items-center justify-center 
              p-1.5 rounded-lg transition-all
              ${isActive ? "bg-[#E9AB1D]/20" : ""}
            `}
          >
            {icon}
          </div>

          <span
            className={`
              text-[10px] font-semibold mt-0.5
              ${isActive ? "text-[#E9AB1D]" : "text-gray-500"}
            `}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}
