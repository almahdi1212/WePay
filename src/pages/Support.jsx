import React from "react";
import { motion } from "framer-motion";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaTiktok,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function Support() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-6 py-20 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* ===== العنوان ===== */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-14 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: "linear-gradient(90deg, #E9AB1D, #c98a00, #E9AB1D)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
          animation: "shine 6s linear infinite",
        }}
      >
        <FaHeadset className="text-[#E9AB1D]" />
        تواصل معنا — الدعم الفني
      </motion.h1>

      <style>
        {`
          @keyframes shine {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.12); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes reflection {
            0% { transform: translateX(-150%) rotate(25deg); opacity: 0.2; }
            50% { opacity: 0.4; }
            100% { transform: translateX(150%) rotate(25deg); opacity: 0.2; }
          }
          .icon-gold {
            color: #E9AB1D;
            filter: drop-shadow(0 2px 6px rgba(233, 171, 29, 0.35));
            transition: all 0.3s ease-in-out;
          }
          .icon-gold:hover {
            color: #c98a00;
            filter: drop-shadow(0 0 12px rgba(233, 171, 29, 0.6));
          }
          .animate-pulse-smooth {
            animation: pulse 3s infinite ease-in-out;
          }
          .card {
            position: relative;
            overflow: hidden;
          }
          .card::before {
            content: "";
            position: absolute;
            top: 0;
            left: -150%;
            width: 50%;
            height: 100%;
            background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-25deg);
            opacity: 0;
            pointer-events: none;
          }
          .card:hover::before {
            animation: reflection 1.5s ease-in-out forwards;
            opacity: 1;
          }
        `}
      </style>

      {/* ===== قنوات التواصل ===== */}
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
              duration: 0.8,
              ease: "easeOut",
            },
          },
        }}
      >
        {[ 
          {
            icon: <FaWhatsapp />,
            title: "واتساب",
            desc: "+218 91 234 5678",
          },
          {
            icon: <FaTiktok />,
            title: "تيك توك",
            desc: "@wepay.ly",
          },
          {
            icon: <FaEnvelope />,
            title: "البريد الإلكتروني",
            desc: "support@wepay.ly",
          },
          {
            icon: <FaPhoneAlt />,
            title: "الهاتف",
            desc: "+218 21 456 7890",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{
              scale: 1.07,
              rotateX: 6,
              rotateY: -6,
              boxShadow: "0 12px 25px rgba(233,171,29,0.25)",
            }}
            whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
            className="card bg-white p-6 rounded-2xl shadow-md border border-[#E9AB1D]/30 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl cursor-pointer"
          >
            <div className="text-4xl mb-3 animate-pulse-smooth icon-gold">
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== موقع الشركة وساعات العمل ===== */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-md p-10 border border-[#E9AB1D]/30 mb-20 text-right items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        {/* الخريطة */}
        <div className="w-full h-64 rounded-2xl border border-[#E9AB1D]/40 overflow-hidden shadow-sm">
          <iframe
            title="WePay Location"
            src="https://www.google.com/maps?q=32.906063,+13.266803&output=embed"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            loading="lazy"
          ></iframe>
        </div>

        {/* الموقع وساعات العمل */}
        <div className="flex flex-col justify-center space-y-8">
          {/* موقع الشركة */}
          <motion.div
            className="flex items-start gap-4"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#FFF9EF] rounded-full shadow-sm animate-pulse-smooth">
              <FaMapMarkerAlt className="text-2xl icon-gold" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">
                موقع الشركة
              </h3>
              <p className="text-gray-600 leading-relaxed">
                طرابلس – طريق الشط – جزيرة معيتيقة – مقابل الأبراج
              </p>
            </div>
          </motion.div>

          {/* ساعات العمل */}
          <motion.div
            className="flex items-start gap-4"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-[#FFF9EF] rounded-full shadow-sm animate-pulse-smooth">
              <FaClock className="text-2xl icon-gold" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">
                ساعات العمل
              </h3>
              <p className="text-gray-600">
                يوميًا من الساعة 10:00 صباحًا حتى 10:00 مساءً
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ===== الأسئلة الشائعة ===== */}
      <motion.div
        className="bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] rounded-3xl shadow-md p-10 border border-[#E9AB1D]/40 text-right"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-[#E9AB1D] mb-6 flex items-center gap-2 justify-center">
          <FaQuestionCircle className="icon-gold" /> الأسئلة الشائعة
        </h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-[#1A1A1A]">📦 كيف يمكنني تتبع شحنتي؟</p>
            <p className="text-gray-700">
              يمكنك تتبع شحنتك بسهولة عبر صفحة{" "}
              <span className="text-[#E9AB1D] font-semibold">تتبع الشحنة</span>{" "}
              بإدخال رقم التتبع الخاص بك.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#1A1A1A]">💰 كيف يتم احتساب تكلفة الشحن؟</p>
            <p className="text-gray-700">
              يمكنك استخدام{" "}
              <span className="text-[#E9AB1D] font-semibold">حاسبة الأسعار</span>{" "}
              لمعرفة التكلفة بناءً على نوع الأصناف وعددها.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#1A1A1A]">⏱️ كم يستغرق الشحن عادةً؟</p>
            <p className="text-gray-700">
              يعتمد الوقت على الوجهة، وعادةً تستغرق الشحنة من 3 إلى 7 أيام عمل داخل ليبيا.
            </p>
          </div>

          {/* 🆕 الأسئلة الجديدة */}
          <div>
            <p className="font-semibold text-[#1A1A1A]">🛍️ هل يمكنني الطلب من مواقع أخرى غير Shein؟</p>
            <p className="text-gray-700">
              نعم، يمكنك الشراء من أي موقع عالمي، وWe Pay تتكفل بالشراء والشحن إلى ليبيا.
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#1A1A1A]">💳 كيف يمكنني الدفع مقابل طلبي؟</p>
            <p className="text-gray-700">
              يمكنك الدفع نقدًا عند الاستلام أو عبر التحويل المصرفي أو خدمات الدفع الإلكتروني المتوفرة في ليبيا.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
