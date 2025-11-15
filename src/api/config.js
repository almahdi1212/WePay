// 📁 src/api/config.js

// ✅ استيراد الرابط من .env
export const API_PREFIX = import.meta.env.VITE_API_PREFIX || "https://wepay-backend-y41w.onrender.com/api";

console.log("✅ API Prefix:", API_PREFIX); // فقط للتحقق

// ✅ دالة عامة للطلبات GET وPOST وPUT وDELETE (اختياري)

