import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash } from "react-icons/fa";

/* ✅ Toast Component */
function Toast({ show, message, onClose }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/90 backdrop-blur-md border border-[#E9AB1D]/30 text-[#1A1A1A] px-5 py-2 rounded-full shadow-md font-medium">
        {message}
      </div>
    </motion.div>
  );
}

export default function DashboardUpdates() {
  const [updates, setUpdates] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  function showToast(message) {
    setToast({ show: true, message });
  }

  // 🟨 جلب التحديثات
  async function fetchUpdates() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/updates");
      const data = await res.json();
      setUpdates(data?.data || []);
    } catch (err) {
      console.error(err);
      showToast("❌ فشل في جلب التحديثات");
    }
  }

  useEffect(() => {
    fetchUpdates();
  }, []);

  // 🟩 إضافة تحديث جديد
  async function handleAddUpdate(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.date) {
      showToast("⚠️ يرجى ملء جميع الحقول");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          date: form.date,
        }),
      });

      if (!res.ok) throw new Error("فشل في إضافة التحديث");

      showToast("✅ تم إضافة التحديث بنجاح");
      setForm({ title: "", description: "", date: "" });
      setIsModalOpen(false);
      fetchUpdates();
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء الإضافة");
    }
  }

  // 🟥 حذف تحديث
  async function handleDeleteUpdate(id) {
    if (!window.confirm("هل تريد حذف هذا التحديث؟")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/updates/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("فشل في الحذف");

      showToast("🗑️ تم حذف التحديث بنجاح");
      fetchUpdates();
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء الحذف");
    }
  }

  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-8">
      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />

      {/* 🟨 العنوان الرئيسي */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">آخر التحديثات</h1>
        <p className="text-sm text-gray-500 mb-1">إدارة آخر التحديثات التي تظهر في النظام.</p>
        <p className="text-sm text-gray-500">
          آخر تحديث:{" "}
          <span className="font-semibold text-[#E9AB1D]">
            {new Date().toLocaleString("ar-LY", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
          </span>
        </p>
      </motion.div>

      {/* 🧾 قائمة التحديثات */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-md space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">قائمة التحديثات ({updates.length})</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
          >
            <FaPlus /> إضافة تحديث
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#fffaf1] text-[#1A1A1A] border-b border-[#E9AB1D]/30">
                <th className="py-4 text-sm font-semibold">العنوان</th>
                <th className="py-4 text-sm font-semibold">الوصف</th>
                <th className="py-4 text-sm font-semibold">التاريخ</th>
                <th className="py-4 text-sm font-semibold">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {updates.length > 0 ? (
                updates.map((update) => (
                  <motion.tr
                    key={update.id}
                    whileHover={{ backgroundColor: "rgba(233,171,29,0.07)" }}
                    className="border-b border-[#E9AB1D]/15 transition"
                  >
                    <td className="py-3 text-[#1A1A1A] font-medium">{update.title}</td>
                    <td className="py-3 text-gray-700">{update.description}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(update.date).toLocaleDateString("ar-LY")}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="p-2 bg-[#fff9f9] border border-red-200 rounded-xl hover:bg-red-100 transition"
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
                    لا توجد تحديثات مضافة بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 🪟 مودال إضافة تحديث */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white/90 backdrop-blur-xl border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#1A1A1A]">إضافة تحديث جديد</h3>
            <form onSubmit={handleAddUpdate} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">العنوان</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">الوصف</label>
                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">التاريخ</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#E9AB1D]/20"
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
