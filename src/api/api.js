// src/api/api.js

import { API_PREFIX } from "./config"; // ✅ الاستيراد الصحيح من config.js

/**
 * دالة موحدة للتعامل مع جميع الطلبات API Requests
 */
export async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // 🧩 إذا كانت العملية تحتاج توكن (auth = true)
  if (auth) {
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    // ✅ استخدم البريفكس هنا
    const response = await fetch(`${API_PREFIX}${endpoint}`, options);

    const data = await response.json().catch(() => ({
      message: "فشل في قراءة استجابة الخادم.",
    }));

    if (!response.ok) {
      // ✅ إذا انتهت الجلسة (401)، نحذف التوكن ونوجّه لتسجيل الدخول
      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("username");
        window.location.href = "/login";
      }

      throw new Error(data.message || "حدث خطأ أثناء الاتصال بالخادم.");
    }

    return data;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw new Error(error.message || "فشل الاتصال بالخادم.");
  }
}
