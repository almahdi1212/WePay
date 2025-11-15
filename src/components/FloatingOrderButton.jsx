import React from "react";

const FloatingOrderButton = () => {
  const whatsappNumber = "218915771795";
  const message = encodeURIComponent("مرحباً 👋، أود بدء الطلب الآن من SHEIN ✨");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="wepay-floating-btn fixed right-4 z-[60] font-semibold text-white px-6 py-3 rounded-full select-none shadow-lg overflow-hidden group transition-all duration-300"
      style={{
        bottom: "84px", // 🔥 فوق البوتوم ناف بـ مسافة مناسبة
        background: "linear-gradient(135deg, #E9AB1D 0%, #C98A00 100%)",
        boxShadow: "0 6px 20px rgba(233, 171, 29, 0.35)",
        fontSize: "14px",
        whiteSpace: "nowrap"
      }}
    >
      <span
        className="relative z-10"
        style={{
          color: "#fff",
          fontWeight: "600",
          textShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        ابدأ الطلب الآن
      </span>

      {/* ✨ لمعان متحرك عند hover */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.3s] ease-out rounded-full"
      ></span>

      <style>
        {`
          .wepay-floating-btn:hover {
            transform: translateY(-4px) scale(1.04);
            box-shadow: 0 12px 35px rgba(233, 171, 29, 0.55);
            background: linear-gradient(135deg, #F8C73E 0%, #E9AB1D 50%, #C98A00 100%);
          }
        `}
      </style>
    </a>
  );
};

export default FloatingOrderButton;
