import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuMegaphone, LuTarget, LuAward } from "react-icons/lu";
import { FaRocket } from "react-icons/fa6";

/**
 * Home.jsx
 * الصفحة الرئيسية — متكاملة + جلب التحديثات من /api/updates
 */

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [updatesError, setUpdatesError] = useState("");

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoadingUpdates(true);
      setUpdatesError("");

      try {
        const res = await fetch("http://127.0.0.1:8000/api/updates");
        const data = await res.json();

        // دعم شكل الاستجابة { success: true, data: [...] } أو مصفوفة مباشرة
        if (data === null) {
          setUpdates([]);
        } else if (Array.isArray(data)) {
          setUpdates(data);
        } else if (data.success && Array.isArray(data.data)) {
          setUpdates(data.data);
        } else if (data.data && Array.isArray(data.data)) {
          setUpdates(data.data);
        } else {
          // محاولة استخراج إن كان هناك مفتاح باسم updates أو similar
          const possible = data.updates || data.results || [];
          setUpdates(Array.isArray(possible) ? possible : []);
        }
      } catch (err) {
        console.error("Error fetching updates:", err);
        setUpdatesError("حدث خطأ أثناء جلب التحديثات. حاول لاحقاً.");
      } finally {
        setLoadingUpdates(false);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 overflow-hidden">
      {/* ===== القسم العلوي (Hero) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* النصوص */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-right"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-snug"
            style={{ color: "#1A1A1A", lineHeight: 1.05 }}
          >
            تابع شحنتك{" "}
            <span className="text-[#E9AB1D]">بسهولة وسرعة ⚡</span>
          </h1>

          <p
            className="text-base sm:text-lg mb-8 leading-relaxed px-2 sm:px-0"
            style={{ color: "#4B4B4B" }}
          >
            مع{" "}
            <span className="font-semibold text-[#E9AB1D]">We Pay</span>، وكيل{" "}
            <span className="font-semibold">Shein</span> الرسمي في ليبيا، نوفر
            لك تجربة شراء وشحن مريحة وآمنة من جميع المتاجر العالمية. تابع
            شحنتك لحظة بلحظة عبر نظام تتبع دقيق وسهل الاستخدام.
          </p>

          <Link
            to="/track"
            className="inline-block bg-[#E9AB1D] text-white font-semibold px-6 sm:px-8 py-3 rounded-full shadow-md hover:bg-[#d49616] transition-all duration-300 text-sm sm:text-base"
          >
            تتبع شحنتك الآن
          </Link>
        </motion.div>

        {/* الصورة التوضيحية (SVG) */}
        <motion.div
          className="flex justify-center mt-8 md:mt-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative w-full max-w-[20rem] sm:max-w-md md:max-w-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="w-full h-auto"
            >
              {/* الصندوق (تصميم خطي نظيف) */}
              <g stroke="#CFCFCF" strokeWidth="4" fill="none" transform="translate(0,20)">
                <path d="M85 150 L200 100 L315 150 L200 200 Z" />
                <path d="M85 150 L85 250 L200 300 L200 200 Z" />
                <path d="M315 150 L315 250 L200 300" />
                <path d="M230 130 L270 145" />
                <path d="M215 275 L230 265" />
                <path d="M215 288 L230 278" />
              </g>

              {/* دبوس الموقع مع نبض وتموضع أعلى قليلاً */}
              <g transform="translate(200,50)">
                <circle
                  cx="0"
                  cy="13"
                  r="12"
                  fill="none"
                  stroke="#E9AB1D"
                  strokeWidth="3"
                >
                  <animate attributeName="r" from="12" to="30" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>

                <path
                  d="M0 -40 C28 -40 50 -15 50 13 C50 40 0 90 0 90 C0 90 -50 40 -50 13 C-50 -15 -28 -40 0 -40 Z"
                  fill="none"
                  stroke="#E9AB1D"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="0" cy="13" r="10" fill="#E9AB1D" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ===== آخر التحديثات (Updates) ===== */}
      <motion.section
        className="mt-12 sm:mt-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className="text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 text-center flex items-center justify-center gap-2"
          style={{ color: "#E9AB1D" }}
        >
          <LuMegaphone className="text-3xl sm:text-4xl" /> آخر التحديثات
        </h2>

        {/* loading / error / no-updates handling */}
        {loadingUpdates ? (
          <p className="text-center text-gray-500">جاري تحميل التحديثات...</p>
        ) : updatesError ? (
          <p className="text-center text-red-600">{updatesError}</p>
        ) : updates.length === 0 ? (
          <p className="text-center text-gray-400 italic">لا توجد تحديثات حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-0">
            {updates.map((update, index) => (
              <motion.div
                key={update.id ?? index}
                className="p-5 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center sm:text-right"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.18 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-gray-400 mb-2">
                  {update.date
                    ? new Date(update.date).toLocaleDateString("ar-LY", {
                        year: "numeric",
                        month: "long",
                      })
                    : ""}
                </div>
                <div className="text-base sm:text-lg font-semibold text-[#1A1A1A] mb-1">
                  {update.title}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">
                  {update.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* ===== من نحن ===== */}
      <motion.section
        className="mt-16 sm:mt-20 relative py-16 sm:py-20"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fffaf0] to-[#fff3d2] opacity-95"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 sm:mb-8"
            style={{
              background: "linear-gradient(to right, #E9AB1D, #c98a00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            👥 من نحن
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-center leading-relaxed font-medium text-[#2C2C2C] max-w-3xl mx-auto mb-10 sm:mb-14 px-2 sm:px-0"
          >
            <span className="font-bold text-[#E9AB1D]">We Pay</span> هي الشركة
            الليبية الرائدة في مجال التسوق الدولي، وتعمل كوكيل رسمي لمنصة{" "}
            <span className="font-bold text-[#E9AB1D]">Shein</span> داخل ليبيا.
            نتيح لك شراء المنتجات من Shein ومن أي موقع عالمي، ونتكفل بعملية
            الدفع والشحن والتوصيل إلى باب بيتك بكل سهولة وموثوقية.
          </motion.p>

          <div className="flex justify-center mb-12 sm:mb-16">
            <div className="h-[3px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-[#E9AB1D] to-transparent rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 text-center px-2 sm:px-0">
            {/* بطاقة رؤيتنا */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-8 sm:p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <FaRocket className="text-xl sm:text-2xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3">
                رؤيتنا
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                أن نجعل التسوق من المواقع العالمية متاحًا لكل الليبيين بسهولة
                وأمان، مع توفير حلول شحن ودفع ذكية ومبتكرة.
              </p>
            </motion.div>

            {/* بطاقة مهمتنا */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-8 sm:p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <LuTarget className="text-2xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3">
                مهمتنا
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                تقديم خدمات متكاملة من الشراء وحتى التوصيل، مع نظام تتبع شحنات
                متطور يمنح عملاءنا الثقة والراحة في كل خطوة.
              </p>
            </motion.div>

            {/* بطاقة قيمنا */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-8 sm:p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <LuAward className="text-xl sm:text-2xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3">
                قيمنا
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                الموثوقية، الشفافية، الدقة، والالتزام بتقديم تجربة تسوق عالمية
                بمعايير عالية داخل ليبيا.
              </p>
            </motion.div>
          </div>

          <motion.p className="mt-12 sm:mt-16 text-center text-[#E9AB1D] font-semibold text-base sm:text-lg italic px-4">
            “مع We Pay، التسوق من الخارج أصبح أقرب من أي وقت مضى.”
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
