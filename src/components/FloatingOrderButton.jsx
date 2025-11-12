import React from "react";

const FloatingOrderButton = () => {
  const whatsappNumber = "218915771795"; // رقم الشركة
  const message = encodeURIComponent("مرحباً 👋، أود بدء الطلب الآن من SHEIN ✨");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="wepay-floating-btn fixed bottom-6 right-6 z-50 font-semibold text-white px-8 py-4 rounded-full select-none shadow-lg overflow-hidden group transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #E9AB1D 0%, #C98A00 100%)",
        boxShadow: "0 6px 20px rgba(233, 171, 29, 0.35)",
        letterSpacing: "0.3px",
        fontSize: "15px",
        whiteSpace: "nowrap",
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
        ابدأ الطلب من SHEIN الآن
      </span>

      {/* ✨ لمعان متحرك عند hover */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.3s] ease-out"
        style={{
          borderRadius: "999px",
          zIndex: 1,
        }}
      ></span>

      {/* ✅ التأثير خاص فقط بزر الطلب */}
      <style>
        {`
          .wepay-floating-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 35px rgba(233, 171, 29, 0.55);
            background: linear-gradient(135deg, #F8C73E 0%, #E9AB1D 50%, #C98A00 100%);
          }
        `}
      </style>
    </a>
  );
};

export default FloatingOrderButton;
