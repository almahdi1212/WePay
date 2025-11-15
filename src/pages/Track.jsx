// 📁 src/pages/Track.jsx
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
import { API_PREFIX } from "../api/config";
import FloatingOrderButton from "../components/FloatingOrderButton"; // ✅ زر الطلب الثابت

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statusMap = {
    1: {
      status: "تم تأكيد الطلب",
      description: "تم تأكيد الطلب وسيتم شراؤه قريبًا.",
      icon: <FaBoxOpen />,
    },
    2: {
      status: "تم شراء الطلب",
      description: "تم شراء الطلب بنجاح وهو الآن في مرحلة الشحن.",
      icon: <FaTruck />,
    },
    3: {
      status: "الطلبية جاهزة",
      description: "الطلبية الآن جاهزة للاستلام في مقر الشركة.",
      icon: <FaClock />,
    },
    4: {
      status: "تم تسليم الشحنة",
      description: "تم تسليم الشحنة بنجاح. شكرًا لاستخدامك WePay.",
      icon: <FaCheckCircle />,
    },
  };

  const handleSearch = async () => {
    setError("");
    setShipment(null);

    if (!trackingNumber.trim()) {
      setError("الرجاء إدخال رقم الشحنة.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_PREFIX}/shipments/${trackingNumber.trim()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError("لم يتم العثور على الشحنة 😔");
      } else {
        setShipment(data.data);
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setError("حدث خطأ أثناء الاتصال بالخادم.");
    }

    setLoading(false);
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.25, ease: "easeOut" },
    }),
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("ar-LY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLastUpdateDate = (histories) => {
    if (!histories || histories.length === 0) return null;
    const last = [...histories].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )[0];
    return last.created_at;
  };

  return (
    <div className="relative">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-20 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* العنوان */}
        <motion.h1
  className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug text-center flex flex-wrap items-center justify-center gap-3 mb-1 pt-10 pb-2"

          style={{
            background: "linear-gradient(90deg, #E9AB1D, #c98a00, #E9AB1D)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shine 6s linear infinite",
            textShadow: "0 0 12px rgba(233,171,29,0.18)",
          }}
        >
          <span className="flex items-center gap-2">
            تتبع شحنتك خطوة بخطوة
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <FaShippingFast className="text-[#E9AB1D] text-5xl" />
            </motion.span>
          </span>
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
          className="mt-6 bg-white shadow-md rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 border border-[#E9AB1D]/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="أدخل رقم الشحنة (مثال: WP123456)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E9AB1D] text-center sm:text-right"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-[#E9AB1D] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#d49616] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaSearch />
            {loading ? "جاري البحث..." : "تتبع الشحنة"}
          </button>
        </motion.div>

        {/* رسالة الخطأ */}
        {error && (
          <motion.div
            className="mt-10 p-6 bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] border border-[#E9AB1D]/40 rounded-3xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaBoxOpen className="text-5xl text-[#E9AB1D] mb-3 mx-auto" />
            <h3 className="text-lg font-bold text-[#1A1A1A]">{error}</h3>
            <p className="text-gray-600 mt-1">تحقق من رقم الشحنة وأعد المحاولة.</p>
          </motion.div>
        )}

        {/* تفاصيل الشحنة */}
        {shipment && (
          <motion.div
            className="mt-10 bg-white rounded-3xl shadow-lg p-8 border border-[#E9AB1D]/30 text-right"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#E9AB1D] mb-2 text-center">
              رقم الشحنة: {shipment.tracking_number}
            </h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              الحالة الحالية:{" "}
              <span className="font-semibold text-[#1A1A1A]">
                {statusMap[shipment.status_code]?.status}
              </span>
            </p>

            <div className="relative pr-6 sm:pr-10">
              <div className="absolute right-[12px] sm:right-[16px] top-0 bottom-0 w-[2px] sm:w-[3px] bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] rounded-full"></div>

              {Object.keys(statusMap)
                .filter((key) => Number(key) <= shipment.status_code)
                .map((key, index) => {
                  const step = statusMap[key];
                  const record = shipment.status_histories?.find(
                    (r) => Number(r.status_code) === Number(key)
                  );
                  const lastUpdate = getLastUpdateDate(shipment.status_histories);
                  const date = record?.created_at
                    ? formatDate(record.created_at)
                    : formatDate(lastUpdate);

                  return (
                    <motion.div
                      key={key}
                      className="relative mb-8 sm:mb-10 pl-6 sm:pl-8"
                      variants={fadeUpVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <div
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-white text-lg shadow-md border-2 border-white ${
                          Number(key) === shipment.status_code
                            ? "bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] animate-pulse"
                            : "bg-gray-300"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <div
                        className={`mr-8 sm:mr-10 p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                          Number(key) === shipment.status_code
                            ? "bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] border border-[#E9AB1D]/40 shadow-md"
                            : "bg-gray-50 border border-gray-100 hover:shadow-md"
                        }`}
                      >
                        <div className="font-semibold text-base sm:text-lg text-[#1A1A1A] mb-1">
                          {step.status}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          {date}
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ✅ زر الطلب الثابت */}
      <FloatingOrderButton />
    </div>
  );
}
