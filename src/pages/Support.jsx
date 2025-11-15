import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaFacebookF,
  FaClock,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import FloatingOrderButton from "../components/FloatingOrderButton";

export default function Support() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      icon: "📦",
      q: "كيف يمكنني تتبع شحنتي؟",
      a: "يمكنك تتبع شحنتك بسهولة عبر صفحة تتبع الشحنة بإدخال رقم التتبع الخاص بك.",
    },
    {
      icon: "💰",
      q: "كيف يتم احتساب تكلفة الشحن؟",
      a: "يمكنك استخدام حاسبة الأسعار لمعرفة التكلفة بناءً على نوع الأصناف وعددها.",
    },
    {
      icon: "⏱️",
      q: "كم يستغرق الشحن عادةً؟",
      a: "يعتمد الوقت على الوجهة، وعادةً تستغرق الشحنة من 3 إلى 7 أيام عمل داخل ليبيا.",
    },
    {
      icon: "🛍️",
      q: "هل يمكنني الطلب من مواقع أخرى غير Shein؟",
      a: "نعم، يمكنك الشراء من أي موقع عالمي وWe Pay تتكفل بالشراء والشحن إلى ليبيا.",
    },
    {
      icon: "💳",
      q: "كيف يمكنني الدفع مقابل طلبي؟",
      a: "يمكنك الدفع نقدًا عند الاستلام أو عبر التحويل المصرفي أو خدمات الدفع الإلكتروني المتوفرة في ليبيا.",
    },
  ];

  return (
    <div className="relative">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* ===== العنوان ===== */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-14 flex items-center justify-center gap-3 flex-wrap"
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
            .icon-gold {
              color: #E9AB1D;
              filter: drop-shadow(0 2px 6px rgba(233, 171, 29, 0.35));
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
    desc: "0915771795",
    link: "https://wa.me/218915771795",
  },
    {
    icon: <FaFacebookF />,
    title: "فيسبوك",
    desc: "We Shein Libya",
    link: "https://www.facebook.com/wesheinlibya",
  },
  {
    icon: <FaTiktok />,
    title: "تيك توك",
    desc: "@wepay_ly",
    link: "https://www.tiktok.com/@wepay_ly",
  },
  {
    icon: <FaEnvelope />,
    title: "البريد الإلكتروني",
    desc: "info@sheinlibya.com",
    link: "mailto:info@sheinlibya.com",
  },

]

.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              whileHover={{
                scale: 1.06,
                boxShadow: "0 10px 25px rgba(233,171,29,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-[#E9AB1D]/30 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg cursor-pointer no-underline"
            >
              <div className="text-4xl mb-3 icon-gold">{item.icon}</div>
              <h3 className="font-semibold text-lg text-[#1A1A1A] mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* ===== موقع الشركة وساعات العمل ===== */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-md p-6 sm:p-10 border border-[#E9AB1D]/30 mb-20 text-right items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
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

          <div className="flex flex-col justify-center space-y-8">
            <motion.div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFF9EF] rounded-full shadow-sm">
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

            <motion.div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFF9EF] rounded-full shadow-sm">
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
          className="bg-gradient-to-br from-[#fff8e6] via-[#fff3d6] to-[#fff0cc] rounded-3xl shadow-md p-6 sm:p-10 border border-[#E9AB1D]/30 text-right"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E9AB1D] mb-8 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-[#E9AB1D]" /> الأسئلة الشائعة
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl border border-[#E9AB1D]/20 shadow-sm hover:shadow-md transition-all duration-300 ${
                  openIndex === index
                    ? "bg-gradient-to-r from-[#fff6e0] to-[#fff2cf]"
                    : "bg-[#fffaf0]"
                }`}
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-right px-4 py-4 sm:px-6 sm:py-5 font-semibold text-[#1A1A1A]"
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg">
                    <span className="text-xl">{faq.icon}</span>
                    {faq.q}
                  </span>
                  {openIndex === index ? (
                    <FaChevronUp className="text-[#E9AB1D]" />
                  ) : (
                    <FaChevronDown className="text-[#E9AB1D]" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="px-6 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{
                        duration: 0.15,
                        ease: "easeOut",
                      }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== تواصل عبر واتساب ===== */}
        <div className="mt-12 bg-gradient-to-r from-[#fff8e6] via-[#fff3d6] to-[#fff0cc] border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-5">
          <p className="text-lg sm:text-xl font-semibold text-[#1A1A1A] leading-relaxed">
            <span className="text-2xl align-middle">💬</span>{" "}
            لم تجد إجابتك؟ <br className="sm:hidden" />
            <span className="text-[#E9AB1D] font-bold">
              {" "}
              تواصل معنا عبر واتساب
            </span>
          </p>

          <a
            href="https://wa.me/218915771795"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#E9AB1D] hover:bg-[#d49616] text-white font-semibold text-lg px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            style={{ minWidth: "240px" }}
          >
            <FaWhatsapp className="text-2xl text-white animate-pulse" />
            تواصل عبر واتساب
          </a>
        </div>
      </motion.div>

      {/* ✅ زر الطلب الثابت */}
      <FloatingOrderButton />
    </div>
  );
}
