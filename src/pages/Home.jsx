/* --- كامل الكود جاهز --- */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { LuMegaphone } from "react-icons/lu";
import FloatingOrderButton from "../components/FloatingOrderButton";

/** زر تسجيل الدخول */
const LoginButton = () => (
  <a
    href="/login"
    className="
      fixed top-3 right-3 sm:top-4 sm:right-4 z-50
      bg-white text-[#E9AB1D]
      border border-[#E9AB1D]/40
      shadow-md
      rounded-full
      flex items-center gap-2
      px-4 py-2 sm:px-5 sm:py-2.5
      text-sm sm:text-base
      font-semibold
      transition-all duration-300
      hover:bg-[#E9AB1D] hover:text-white
    "
    style={{ backdropFilter: 'blur(6px)' }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z" />
    </svg>
    دخول
  </a>
);

export default function Home() {

  const [updates, setUpdates] = useState([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);

  useEffect(() => {
    fetch("https://wepay-backend-y41w.onrender.com/api/updates")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUpdates(data);
        else if (Array.isArray(data.data)) setUpdates(data.data);
        else setUpdates([]);
      })
      .catch(() => setUpdates([]))
      .finally(() => setLoadingUpdates(false));
  }, []);

  return (
    <div className="home-container relative max-w-7xl mx-auto px-4 sm:px-6 pb-20 overflow-hidden">

      {/* زر الدخول */}
      <LoginButton />

      {/* ====================== HERO ====================== */}
      <div className="hero-section grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center min-h-[55vh] mt-10">

        {/* نصوص الهيرو */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-right px-2 mt-10 md:-mt-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug" style={{ color: "#1A1A1A" }}>
            تابع شحنتك{" "}
            <span className="text-[#E9AB1D]">بسهولة وسرعة ⚡</span>
          </h1>

          <p className="text-base sm:text-lg mb-6 leading-relaxed px-2 sm:px-0" style={{ color: "#4B4B4B" }}>
            مع <span className="font-semibold text-[#E9AB1D]">We Pay</span>، وكيل{" "}
            <span className="font-semibold">Shein</span> الرسمي في ليبيا، نوفر لك تجربة شراء وشحن مريحة وآمنة, تابع شحنتك من لحظة الطلب حتى وصولها إلى باب منزلك, عبر نظام تتبع دقيق وسهل الاستخدام.
          </p>

          <Link
            to="/track"
            className="inline-block bg-[#E9AB1D] text-white font-semibold px-6 sm:px-8 py-3 rounded-full shadow-md hover:bg-[#d49616] transition-all duration-300 text-sm sm:text-base"
          >
            تتبع شحنتك الآن
          </Link>
        </motion.div>

        {/* ===================== البوكس + الدبوس بالشعار ===================== */}
        <motion.div
          className="flex justify-center mt-3 md:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full max-w-[19rem] sm:max-w-[22rem] md:max-w-[30rem] relative">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full">

              {/* box */}
              <g stroke="#CFCFCF" strokeWidth="4" fill="none" transform="translate(0,20)">
                <path d="M85 150 L200 100 L315 150 L200 200 Z" />
                <path d="M85 150 L85 250 L200 300 L200 200 Z" />
                <path d="M315 150 L315 250 L200 300" />
              </g>

{/* 🔥 دبوس مكبّر والدائرة بداخله تماماً */}
<g transform="translate(200,50)">  {/* ← رفع البوضع للأسفل */}
  
  {/* نبض خارجي */}
  <circle cx="0" cy="0" r="40" stroke="#E9AB1D" strokeWidth="3" fill="none">
    
  </circle>

  {/* رأس الدبوس — مكبّر ليستوعب الدائرة */}
  <path
  d="
    M 0 -45
    C 28 -45 48 -25 48 4
    C 48 36 0 90 0 90
    C 0 90 -48 36 -48 4
    C -48 -25 -28 -45 0 -45
    Z
  "
  fill="white"
  stroke="#E9AB1D"
  strokeWidth="4"
/>


  {/* نبض خارجي */}
                <circle cx="0" cy="0" r="26" stroke="#E9AB1D" strokeWidth="3" fill="none">
                  <animate attributeName="r" from="22" to="52" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                                {/* رأس الدبوس — مكبّر ليستوعب الشعار */}
                <circle cx="0" cy="0" r="26" fill="white" stroke="#E9AB1D" strokeWidth="3" />
                                {/* شعار الشركة داخل الدائرة (يناسب الحجم الجديد) */}
                <image
                  href="/favicon-transparent.png"
                  x="-22"
                  y="-22"
                  width="44"
                  height="44"
                />  

</g>


            </svg>

          </div>
        </motion.div>

      </div>

      {/* ====================== آخر التحديثات ====================== */}
      <motion.section
        className="updates-section mt-[-10px] px-2 sm:px-0"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#E9AB1D] mb-12 flex items-center justify-center gap-2">
          <LuMegaphone className="text-3xl sm:text-4xl" />
          آخر التحديثات
        </h2>

        {loadingUpdates ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : updates.length === 0 ? (
          <p className="text-center text-gray-400">لا توجد تحديثات.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-6">
            {updates.map((u, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="
                  relative p-6 sm:p-8 rounded-3xl bg-white
                  shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                  border border-[#f6d98d]/40
                  hover:shadow-[0_10px_30px_rgba(233,171,29,0.25)]
                  hover:-translate-y-1 transition-all duration-300
                "
              >
                <div className="absolute -top-4 right-4 bg-[#E9AB1D] text-white w-14 h-14 flex flex-col items-center justify-center rounded-full shadow-md">
                  <span className="text-sm font-bold">{new Date(u.date).getFullYear()}</span>
                  <span className="text-xs">
                    {new Date(u.date).toLocaleDateString("ar-LY", { month: "long" })}
                  </span>
                </div>

                <div className="mt-8 text-right">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 flex items-center gap-2 justify-start" style={{ direction: 'rtl' }}>
                    <Megaphone className="text-[#E9AB1D] w-5 h-5" />
                    <span>{u.title}</span>
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {u.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </motion.section>

      <FloatingOrderButton />

    </div>
  );
}
