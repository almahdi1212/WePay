import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ✅ هذا المكون يحمي صفحات الداشبورد
 * إذا لم يكن المستخدم مسجلاً الدخول (لا يوجد auth_token)
 * يتم تحويله إلى صفحة /login
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
