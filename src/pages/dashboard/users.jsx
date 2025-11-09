import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { apiRequest } from "../../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", role: "user", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // 🧭 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // 🟡 Toast
  function showToast(message) {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  }

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

  // 🧮 فلترة وبحث المستخدمين
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || u.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  // 🔢 تقسيم المستخدمين للصفحات
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 🟣 إضافة أو تعديل مستخدم
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endpoint = editingUser ? `/users/${editingUser.id}` : "/users";
      const method = editingUser ? "PUT" : "POST";

      await apiRequest(endpoint, method, form, true);

      showToast(editingUser ? "تم تحديث المستخدم بنجاح" : "تمت إضافة مستخدم جديد");
      setForm({ username: "", role: "user", password: "" });
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("❌ فشل العملية:", error);
      showToast("حدث خطأ أثناء الحفظ");
    }
  }

  // 🔴 حذف مستخدم
  async function handleDelete(id) {
    if (!window.confirm("هل تريد حذف هذا المستخدم؟")) return;
    try {
      await apiRequest(`/users/${id}`, "DELETE", null, true);
      showToast("تم حذف المستخدم بنجاح");
      fetchUsers();
    } catch (error) {
      console.error("❌ فشل في الحذف:", error);
      showToast("حدث خطأ أثناء الحذف");
    }
  }

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
        <p className="text-sm text-gray-500">تحكم في حسابات المستخدمين وصلاحياتهم بسهولة.</p>
      </motion.div>

      {/* 🧾 الجدول */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border border-[#E9AB1D]/30 rounded-3xl shadow-lg overflow-hidden"
      >
        {/* رأس الجدول */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-5 border-b border-[#E9AB1D]/20 bg-[#fffaf1]">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن مستخدم..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-white border border-[#E9AB1D]/30 focus:ring-2 focus:ring-[#E9AB1D]/40 text-sm shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-[#E9AB1D]" />
              <select
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2.5 rounded-xl bg-white border border-[#E9AB1D]/30 text-sm focus:ring-2 focus:ring-[#E9AB1D]/40 shadow-sm"
              >
                <option value="all">الكل</option>
                <option value="admin">مسؤول</option>
                <option value="user">مستخدم</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:scale-[1.02] transition"
          >
            <FaPlus /> مستخدم جديد
          </button>
        </div>

        {/* جسم الجدول */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#fffaf1] text-[#1A1A1A] border-b border-[#E9AB1D]/20">
              <tr>
                <th className="py-3 text-sm font-semibold">#</th>
                <th className="py-3 text-sm font-semibold">اسم المستخدم</th>
                <th className="py-3 text-sm font-semibold">الدور</th>
                <th className="py-3 text-sm font-semibold">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((u, index) => (
                  <motion.tr
                    key={u.id}
                    whileHover={{ backgroundColor: "rgba(233,171,29,0.05)" }}
                    className="border-b border-[#E9AB1D]/10 transition"
                  >
                    <td className="py-3 text-gray-700">{startIndex + index + 1}</td>
                    <td className="py-3 font-medium text-[#1A1A1A]">{u.username}</td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.role === "admin"
                            ? "bg-[#fff3d9] text-[#c98a00]"
                            : "bg-[#f5f5f5] text-gray-600"
                        }`}
                      >
                        {u.role === "admin" ? "مسؤول" : "مستخدم"}
                      </span>
                    </td>
                    <td className="py-3 flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setForm({ username: u.username, role: u.role, password: "" });
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-white border border-[#E9AB1D]/30 rounded-lg hover:bg-[#fff7ea] transition"
                        title="تعديل"
                      >
                        <FaEdit className="text-[#E9AB1D]" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-2 bg-[#fff9f9] border border-red-200 rounded-lg hover:bg-red-100 transition"
                        title="حذف"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
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

        {/* 🔢 الترقيم */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-5 bg-[#fffaf1] border-t border-[#E9AB1D]/20">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-[#E9AB1D]/30 text-[#E9AB1D] hover:bg-[#fff7ea]"
              }`}
            >
              <FaChevronRight />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-lg border ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white border-transparent"
                    : "border-[#E9AB1D]/30 text-[#1A1A1A] hover:bg-[#fff7ea]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-[#E9AB1D]/30 text-[#E9AB1D] hover:bg-[#fff7ea]"
              }`}
            >
              <FaChevronLeft />
            </button>
          </div>
        )}
      </motion.div>

      {/* مودال إضافة / تعديل المستخدم */}
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
              <div>
                <label className="block text-sm text-gray-600 mb-1">اسم المستخدم</label>
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">الدور</label>
                <select
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                >
                  <option value="user">مستخدم</option>
                  <option value="admin">مسؤول</option>
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">كلمة المرور</label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                  />
                </div>
              )}

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
