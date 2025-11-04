import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      className="relative bg-white border-t border-[#E9AB1D]/30 pt-16 pb-10 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* ✅ خلفية ذهبية شفافة خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#fff8e1] via-white/90 to-transparent pointer-events-none"></div>

      {/* ✨ تأثير انعكاس الضوء المتحرك */}
      <motion.div
        className="absolute top-0 left-[-200px] w-[200px] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl opacity-0"
        animate={{
          x: ["-200px", "120%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 15, // ⏱️ تمر كل 15 ثانية
          ease: "easeInOut",
        }}
      ></motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-right">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* العمود 1: الشعار والوصف */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <div className="flex justify-center md:justify-start items-center mb-4">
              <span className="text-[#E9AB1D] font-extrabold text-2xl mr-2">W</span>
              <span className="text-[#1A1A1A] font-semibold text-xl">We Pay</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              شركة <span className="text-[#E9AB1D] font-semibold">We Pay</span> تقدم حلول شحن
              مبتكرة ودقيقة، لتتبع الشحنات بسهولة وسرعة داخل وخارج ليبيا.
            </p>
          </motion.div>

          {/* العمود 2: الروابط */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end"
          >
            <h3 className="text-[#1A1A1A] font-semibold mb-4 text-lg">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E9AB1D] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-[#E9AB1D] transition-colors">
                  تتبع الشحنة
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-[#E9AB1D] transition-colors">
                  حاسبة الأسعار
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-[#E9AB1D] transition-colors">
                  الدعم الفني
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* العمود 3: التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-end"
          >
            <h3 className="text-[#1A1A1A] font-semibold mb-4 text-lg">تواصل معنا</h3>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaEnvelope />, link: "mailto:info@wepay.com" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#E9AB1D]/40 text-[#E9AB1D] hover:bg-[#E9AB1D] hover:text-white transition-all duration-300"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                  }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              البريد الإلكتروني:{" "}
              <a
                href="mailto:info@wepay.com"
                className="text-[#E9AB1D] hover:underline"
              >
                info@wepay.com
              </a>
            </p>
            <p className="text-gray-500 text-sm">الهاتف: +218 91 000 0000</p>
          </motion.div>
        </div>

        {/* خط فاصل + حقوق */}
        <motion.div
          className="border-t border-[#E9AB1D]/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-[#E9AB1D] font-semibold">We Pay</span>. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-400">
            تصميم وتطوير بواسطة{" "}
            <span className="text-[#E9AB1D] font-semibold">We Pay Tech Team</span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
