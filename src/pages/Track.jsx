import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBoxOpen,
  FaSearch,
  FaShippingFast,
} from "react-icons/fa";

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧭 خريطة الحالات (status_code → التفاصيل)
  const statusMap = {
    1: {
      status: "تم استلام الشحنة من المتجر",
      description: "تم استلام طلبك من المتجر وهو الآن في مرحلة التحضير للشحن.",
      icon: <FaBoxOpen />,
      date: "25 أكتوبر 2025",
    },
    2: {
      status: "الشحنة غادرت المستودع",
      description:
        "تم تجهيز الشحنة وشحنها من المستودع الرئيسي متجهة إلى مركز التوزيع.",
      icon: <FaTruck />,
      date: "26 أكتوبر 2025",
    },
    3: {
      status: "في الطريق إلى طرابلس",
      description:
        "الشحنة الآن في الطريق، سيتم تحديث الحالة فور وصولها إلى وجهتها.",
      icon: <FaClock />,
      date: "27 أكتوبر 2025",
    },
    4: {
      status: "تم تسليم الشحنة بنجاح",
      description: "تم تسليم الشحنة إلى العميل بنجاح. شكراً لاستخدامك We Pay.",
      icon: <FaCheckCircle />,
      date: "28 أكتوبر 2025",
    },
  };

  // 🛰️ جلب بيانات الشحنة من الـ API
  const handleSearch = async () => {
    setError("");
    setShipment(null);

    if (!trackingNumber.trim()) {
      setError("الرجاء إدخال رقم الشحنة.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://wepay-backend-y41w.onrender.com/api/shipments/${trackingNumber.trim()}`
      );
      const data = await res.json();

      if (!data.success) {
        setError("لم يتم العثور على الشحنة 😔");
      } else {
        setShipment(data);
      }
    } catch (e) {
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    }

    setLoading(false);
  };

  // ⏱️ توليد المراحل بناءً على status_code
  const buildHistory = (statusCode) => {
    return Object.entries(statusMap)
      .filter(([key]) => Number(key) <= statusCode)
      .map(([key, val]) => ({
        id: Number(key),
        ...val,
      }));
  };

  // ✨ إعدادات الأنيميشن العامة
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.25,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* العنوان */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug text-center select-none flex flex-wrap items-center justify-center gap-2 mt-0 mb-6 px-2"
        initial={{ opacity: 0, y: 25, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{
          background: "linear-gradient(90deg, #E9AB1D, #c98a00, #E9AB1D)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 6s linear infinite",
          textShadow: "0 0 12px rgba(233,171,29,0.18)",
        }}
      >
        <motion.span className="flex items-center gap-2 whitespace-nowrap">
          تتبع شحنتك خطوة بخطوة
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <FaShippingFast
              className="text-[#E9AB1D] text-xl sm:text-2xl md:text-3xl"
              style={{
                filter: "drop-shadow(0 3px 8px rgba(233,171,29,0.25))",
              }}
            />
          </motion.span>
        </motion.span>
      </motion.h1>

      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
        `}
      </style>

      {/* مربع البحث */}
      <motion.div
        className="mt-6 bg-white/90 shadow-md rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 border border-[#E9AB1D]/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        <input
          type="text"
          placeholder="أدخل رقم الشحنة هنا (مثال: WP123)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E9AB1D] text-center sm:text-right text-sm sm:text-base"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-[#E9AB1D] text-white font-semibold px-6 sm:px-8 py-3 rounded-full shadow-md hover:bg-[#d49616] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
        >
          <FaSearch />
          {loading ? "جاري البحث..." : "تتبع الشحنة"}
        </button>
      </motion.div>

      {/* رسالة الخطأ */}
      {error && (
        <motion.div
          className="mt-10 p-6 sm:p-8 bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] border border-[#E9AB1D]/40 rounded-3xl shadow-lg text-center flex flex-col items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative">
            <FaBoxOpen className="text-4xl sm:text-5xl text-[#E9AB1D] drop-shadow-md" />
            <FaSearch className="absolute text-[#1A1A1A]/60 text-xl sm:text-2xl top-1 left-1/2 -translate-x-1/2" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
            {error}
          </h3>
          <p className="text-gray-700 text-sm sm:text-lg max-w-md px-2">
            تحقق من رقم الشحنة وأعد المحاولة.
          </p>
        </motion.div>
      )}

      {/* تفاصيل الشحنة */}
      {shipment && (
        <motion.div
          className="mt-10 sm:mt-12 bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-[#E9AB1D]/30 text-right transition-transform duration-500"
          whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[#E9AB1D] mb-4 text-center">
            رقم الشحنة: {shipment.tracking_number}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 text-center">
            الحالة الحالية:{" "}
            <span className="font-semibold text-[#1A1A1A]">
              {statusMap[shipment.status_code]?.status}
            </span>
          </p>

          {/* التايملاين */}
          <div className="relative pr-6 sm:pr-10">
            <div className="absolute right-[12px] sm:right-[16px] top-0 bottom-0 w-[2px] sm:w-[3px] bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] rounded-full"></div>

            {buildHistory(shipment.status_code).map((step, index) => (
              <motion.div
                key={step.id}
                className="relative mb-8 sm:mb-10 pl-6 sm:pl-8"
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {/* الأيقونة */}
                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white text-base sm:text-lg shadow-md border-2 border-white ${
                    index === buildHistory(shipment.status_code).length - 1
                      ? "bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] animate-pulse"
                      : "bg-gray-300"
                  }`}
                >
                  {step.icon}
                </div>

                {/* النصوص */}
                <div
                  className={`mr-8 sm:mr-10 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                    index === buildHistory(shipment.status_code).length - 1
                      ? "bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] border border-[#E9AB1D]/40 shadow-md"
                      : "bg-gray-50 border border-gray-100 hover:shadow-md"
                  }`}
                >
                  <div className="font-semibold text-base sm:text-lg text-[#1A1A1A] mb-1">
                    {step.status}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                    {step.date}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
