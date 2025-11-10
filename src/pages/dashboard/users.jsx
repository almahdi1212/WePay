import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { apiRequest } from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // 🟢 جلب المستخدمين
  async function fetchUsers() {
    try {
      const response = await apiRequest("/users", "GET", null, true);
      setUsers(response?.data || []);
    } catch (error) {
      console.error("❌ فشل في جلب المستخدمين:", error);
      showToast("فشل في تحميل المستخدمين");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🟡 دالة عرض الإشعارات
  function showToast(message) {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  }

  // 🟣 حفظ أو تعديل مستخدم
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endpoint = editingUser ? `/users/${editingUser.id}` : "/users";
      const method = editingUser ? "PUT" : "POST";

      const body = {
        name: form.name,
      };

      // ✅ إرسال username فقط عند الإضافة أو عند تعديل مستخدم ليس admin
      if (!editingUser || (editingUser && editingUser.username !== "admin")) {
        body.username = form.username;
      }

      // ✅ كلمة المرور فقط إذا تمت إضافتها
      if (form.password.trim() !== "" || !editingUser) {
        body.password = form.password;
      }

      await apiRequest(endpoint, method, body, true);

      showToast(editingUser ? "تم تحديث المستخدم بنجاح ✅" : "تمت إضافة مستخدم جديد 🎉");
      setForm({ name: "", username: "", password: "" });
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("❌ فشل العملية:", error);
      if (error.message.includes("username")) {
        showToast("⚠️ اسم المستخدم مستخدم بالفعل");
      } else {
        showToast("حدث خطأ أثناء الحفظ");
      }
    }
  }

  // 🔴 حذف مستخدم
  async function handleDelete(id) {
    if (!window.confirm("هل تريد حذف هذا المستخدم؟")) return;
    try {
      await apiRequest(`/users/${id}`, "DELETE", null, true);
      showToast("🗑️ تم حذف المستخدم بنجاح");
      fetchUsers();
    } catch (error) {
      console.error("❌ فشل في الحذف:", error);
      showToast("حدث خطأ أثناء الحذف");
    }
  }

  // 🔍 فلترة حسب البحث
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-8">
      {/* ✅ Toast */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/90 backdrop-blur-md border border-[#E9AB1D]/30 text-[#1A1A1A] px-5 py-2 rounded-full shadow-md font-medium">
            {toast.message}
          </div>
        </motion.div>
      )}

      {/* 🟨 العنوان */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">إدارة المستخدمين</h1>
        <p className="text-sm text-gray-500">تحكم في حسابات المستخدمين بسهولة.</p>
      </motion.div>

      {/* 🧾 الجدول */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-6 shadow-md space-y-6"
      >
        {/* رأس الجدول */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white border border-[#E9AB1D]/30 focus:ring-2 focus:ring-[#E9AB1D]/40 text-sm shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
          >
            <FaPlus /> إضافة مستخدم
          </button>
        </div>

        {/* جدول المستخدمين */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#fffaf1] text-[#1A1A1A] border-b border-[#E9AB1D]/30">
                <th className="py-4 text-sm font-semibold">#</th>
                <th className="py-4 text-sm font-semibold">الاسم</th>
                <th className="py-4 text-sm font-semibold">اسم المستخدم</th>
                <th className="py-4 text-sm font-semibold">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    whileHover={{ backgroundColor: "rgba(233,171,29,0.07)" }}
                    className="border-b border-[#E9AB1D]/15 transition"
                  >
                    <td className="py-3 text-gray-800">{i + 1}</td>
                    <td className="py-3 font-medium text-[#1A1A1A]">{u.name}</td>
                    <td className="py-3 text-gray-600">{u.username}</td>
                    <td className="py-3 flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setForm({ name: u.name, username: u.username, password: "" });
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-white border border-[#E9AB1D]/30 rounded-lg hover:bg-[#fff7ea] transition"
                      >
                        <FaEdit className="text-[#E9AB1D]" />
                      </button>
                      {u.username !== "admin" && (
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="p-2 bg-[#fff9f9] border border-red-200 rounded-lg hover:bg-red-100 transition"
                        >
                          <FaTrash className="text-red-500" />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-gray-500">
                    لا يوجد مستخدمين مطابقين
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 🪟 مودال إضافة / تعديل المستخدم */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setIsModalOpen(false);
              setEditingUser(null);
            }}
          ></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white/90 backdrop-blur-xl border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4 text-[#1A1A1A]">
              {editingUser ? "تعديل المستخدم" : "إضافة مستخدم جديد"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* الاسم */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">الاسم الكامل</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              {/* اسم المستخدم - فقط إذا لم يكن admin */}
              {!editingUser || (editingUser && editingUser.username !== "admin") ? (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">اسم المستخدم</label>
                  <input
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                  />
                </div>
              ) : null}

              {/* كلمة المرور */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  كلمة المرور {editingUser && <span className="text-gray-400 text-xs">(اختياري)</span>}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder={editingUser ? "اتركه فارغًا إن لم ترغب بالتغيير" : ""}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-white border border-[#E9AB1D]/30"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white"
                >
                  حفظ
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
