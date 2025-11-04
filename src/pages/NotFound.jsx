import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShippingFast } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-gradient-to-b from-[#FFF9EF] via-[#FFE07C] to-[#FFD64F]">
      {/* الأيقونة */}
      <motion.div
        className="relative mb-6 mt-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="w-28 h-28 flex items-center justify-center bg-white rounded-full shadow-lg border-4 border-[#E9AB1D]/30 relative overflow-hidden">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaShippingFast
              className="text-[#E9AB1D] drop-shadow-[0_4px_12px_rgba(233,171,29,0.5)]"
              size={55}
            />
          </motion.div>
        </div>

        {/* تأثير النبض */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#E9AB1D]/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>

      {/* النص */}
      <motion.h1
        className="text-[80px] md:text-[100px] font-extrabold text-[#1A1A1A] mb-2 tracking-wider select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-gray-800 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها.{" "}
        <span className="text-[#E9AB1D] font-semibold">يرجى العودة للرئيسية.</span>
      </motion.p>

      {/* الزر */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-16"
      >
        <Link
          to="/"
          className="bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white px-10 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          العودة إلى الرئيسية
        </Link>
      </motion.div>

      {/* ضوء خافت متحرك */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-[#E9AB1D]/10 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-0 right-10 w-56 h-56 bg-[#c98a00]/10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* خط فاصل وهمي لمنع الفراغ */}
      <div className="absolute bottom-0 w-full h-[2px] bg-[#FFD64F]"></div>
    </div>
  );
}
