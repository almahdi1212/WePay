// 📁 src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
import { API_PREFIX } from "../api/config"; // ✅ استدعاء الرابط من config.js

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("⚠️ يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    setLoading(true);

    try {
      // ✅ استخدم البريفكس من config.js
      const res = await fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message || "فشل تسجيل الدخول");

      // ✅ حفظ التوكن واسم المستخدم في Local Storage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("username", data.user?.username || username);

      // ✅ توجيه المستخدم للوحة التحكم
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
      setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf2] to-[#fff5e1] flex items-center justify-center relative overflow-hidden">
      {/* تأثير الخلفية */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,#E9AB1D20,transparent_50%)]"></div>

      {/* المربع الرئيسي */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-lg border border-[#E9AB1D]/20 shadow-[0_4px_25px_rgba(233,171,29,0.08)] rounded-3xl p-10 w-full max-w-md"
      >
<div className="text-center mb-8">
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="w-28 h-28 mx-auto mb-3 flex items-center justify-center"
  >
    <img
      src="/favicon.png"
      alt="Logo"
      className="w-28 h-28 object-contain drop-shadow-lg"
    />
  </motion.div>

  <h1 className="text-2xl font-extrabold text-[#1A1A1A] mb-1">
    تسجيل الدخول
  </h1>
  <p className="text-gray-500 text-sm">مرحبًا بك في لوحة تحكم WePay</p>
</div>


        {/* رسالة الخطأ */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-[#fff8e6] border border-[#E9AB1D]/40 text-[#8a6d00] p-3 rounded-lg text-center text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* نموذج تسجيل الدخول */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">اسم المستخدم</label>
            <div className="relative">
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E9AB1D]/70" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-3 pr-10 py-3 border border-[#E9AB1D]/20 rounded-xl bg-white/70 text-[#1A1A1A] placeholder-gray-400 focus:ring-2 focus:ring-[#E9AB1D]/40 focus:border-[#E9AB1D]/40 transition-all"
                placeholder="اسم المستخدم"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm">كلمة المرور</label>
            <div className="relative">
              <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E9AB1D]/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-3 border border-[#E9AB1D]/20 rounded-xl bg-white/70 text-[#1A1A1A] placeholder-gray-400 focus:ring-2 focus:ring-[#E9AB1D]/40 focus:border-[#E9AB1D]/40 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ${
              loading
                ? "bg-gradient-to-r from-gray-300 to-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] hover:opacity-95"
            }`}
          >
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} WePay Dashboard. جميع الحقوق محفوظة.
        </p>
      </motion.div>
    </div>
  );
}
