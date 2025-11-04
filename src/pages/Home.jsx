import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuMegaphone, LuTarget, LuAward } from "react-icons/lu";
import { FaRocket } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
      {/* 🟡 القسم العلوي */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* النصوص */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-snug"
           style={{ color: "#1A1A1A" }}
           > تابع شحنتك{" "}
            <span className="text-[#E9AB1D]">بسهولة وسرعة ⚡</span> </h1>

          <p
            className="text-lg mb-8 leading-relaxed"
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
            className="inline-block bg-[#E9AB1D] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#d49616] transition-all duration-300"
          >
            تتبع شحنتك الآن
          </Link>
        </motion.div>

        {/* 🎨 الصورة التوضيحية */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 400"
              className="w-[40rem] md:w-[46rem] h-auto"
            >
              {/* الصندوق */}
              <g
                stroke="#CFCFCF"
                strokeWidth="4"
                fill="none"
                transform="translate(0,20)"
              >
                <path d="M85 150 L200 100 L315 150 L200 200 Z" />
                <path d="M85 150 L85 250 L200 300 L200 200 Z" />
                <path d="M315 150 L315 250 L200 300" />
                <path d="M230 130 L270 145" />
                <path d="M215 275 L230 265" />
                <path d="M215 288 L230 278" />
              </g>

              {/* دبوس الموقع مع نبض */}
              <g transform="translate(200,60)">
                <circle
                  cx="0"
                  cy="13"
                  r="12"
                  fill="none"
                  stroke="#E9AB1D"
                  strokeWidth="3"
                >
                  <animate
                    attributeName="r"
                    from="12"
                    to="30"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
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

      {/* 📢 قسم آخر التحديثات */}
      <motion.section
        className="mt-4"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className="text-3xl font-extrabold mb-10 text-center flex items-center justify-center gap-2"
          style={{ color: "#E9AB1D" }}
        >
          <LuMegaphone className="text-4xl" /> آخر التحديثات   
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="text-sm text-gray-400 mb-2">نوفمبر 2025</div>
            <div className="text-lg font-semibold text-[#1A1A1A]">
              إطلاق نظام تتبع الشحنات الجديد بواجهة محسّنة وسرعة استجابة أعلى.
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="text-sm text-gray-400 mb-2">أكتوبر 2025</div>
            <div className="text-lg font-semibold text-[#1A1A1A]">
              إضافة إمكانية الشراء من مواقع عالمية متعددة إلى جانب Shein.
            </div>
          </div>
        </div>
      </motion.section>

      {/* 👥 قسم من نحن */}
      <motion.section
        className="mt-12 relative py-20"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fffaf0] to-[#fff3d2] opacity-95"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center mb-8"
            style={{
              background: "linear-gradient(to right, #E9AB1D, #c98a00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            👥 من نحن
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-center leading-relaxed font-medium text-[#2C2C2C] max-w-3xl mx-auto mb-14"
          >
            <span className="font-bold text-[#E9AB1D]">We Pay</span> هي الشركة
            الليبية الرائدة في مجال التسوق الدولي، وتعمل كوكيل رسمي لمنصة{" "}
            <span className="font-bold text-[#E9AB1D]">Shein</span> داخل ليبيا.
            نتيح لك شراء المنتجات من Shein ومن أي موقع عالمي، ونتكفل بعملية
            الدفع والشحن والتوصيل إلى باب بيتك بكل سهولة وموثوقية.
          </motion.p>

          <div className="flex justify-center mb-16">
            <div className="h-[3px] w-24 bg-gradient-to-r from-transparent via-[#E9AB1D] to-transparent rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
            {/* الرؤية */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <FaRocket className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">رؤيتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                أن نجعل التسوق من المواقع العالمية متاحًا لكل الليبيين بسهولة
                وأمان، مع توفير حلول شحن ودفع ذكية ومبتكرة.
              </p>
            </motion.div>

            {/* المهمة */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <LuTarget className="text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">مهمتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                تقديم خدمات متكاملة من الشراء وحتى التوصيل، مع نظام تتبع شحنات
                متطور يمنح عملاءنا الثقة والراحة في كل خطوة.
              </p>
            </motion.div>

            {/* القيم */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="bg-white/80 border border-[#E9AB1D]/30 rounded-3xl p-10 shadow-md hover:shadow-[0_15px_35px_rgba(233,171,29,0.25)] transition-all duration-500"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-b from-[#E9AB1D] to-[#c98a00] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md">
                  <LuAward className="text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">قيمنا</h3>
              <p className="text-gray-600 leading-relaxed">
                الموثوقية، الشفافية، الدقة، والالتزام بتقديم تجربة تسوق عالمية
                بمعايير عالية داخل ليبيا.
              </p>
            </motion.div>
          </div>

          <motion.p className="mt-16 text-center text-[#E9AB1D] font-semibold text-lg italic">
            “مع We Pay، التسوق من الخارج أصبح أقرب من أي وقت مضى.”
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
