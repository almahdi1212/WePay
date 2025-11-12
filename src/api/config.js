// 📁 src/api/config.js

// ✅ استيراد الرابط من .env
export const API_PREFIX = import.meta.env.VITE_API_PREFIX || "http://127.0.0.1:8000/api";

console.log("✅ API Prefix:", API_PREFIX); // فقط للتحقق

// ✅ دالة عامة للطلبات GET وPOST وPUT وDELETE (اختياري)
export async function apiRequest(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    // ✅ استخدم البريفكس الصحيح هنا
    const response = await fetch(`${API_PREFIX}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
