// src/api/api.js
const API_BASE_URL = "https://wepay-backend-y41w.onrender.com/api";

export async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  // 🧩 إذا كانت العملية تحتاج توكن (auth = true)
  if (auth) {
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "حدث خطأ أثناء الاتصال بالخادم");
  return data;
}
