import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaMoneyBillWave, FaTruck } from "react-icons/fa";

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

export default function DashboardSettings() {
  const [categories, setCategories] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [shippingRate, setShippingRate] = useState(null);
  const [form, setForm] = useState({ name: "", weight: "" });
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // 🧩 جلب الأصناف
  async function fetchCategories() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories");
      const data = await res.json();

      const list = Array.isArray(data.data) ? data.data : data;

      // ✅ التأكد من وجود weight حتى لو كانت approx_weight
      const normalized = list.map((cat) => ({
        id: cat.id,
        name: cat.name,
        weight: cat.weight ?? cat.approx_weight ?? 0,
      }));

      setCategories(normalized);
    } catch (err) {
      console.error("❌ فشل في جلب الأصناف:", err);
    }
  }

  // 💱 جلب سعر الصرف
  async function fetchExchangeRate() {
    const res = await fetch("http://127.0.0.1:8000/api/exchange-rate");
    const data = await res.json();
    setExchangeRate(data?.data?.rate || data?.rate || 0);
  }

  // 🚚 جلب سعر الشحن
  async function fetchShippingRate() {
    const res = await fetch("http://127.0.0.1:8000/api/shipping-rate");
    const data = await res.json();
    setShippingRate(data?.data?.rate || data?.rate || 0);
  }

  useEffect(() => {
    fetchCategories();
    fetchExchangeRate();
    fetchShippingRate();
  }, []);

  // 🧩 إضافة أو تعديل صنف
  async function handleSaveCategory(e) {
    e.preventDefault();
    try {
      const payload = { name: form.name, weight: parseFloat(form.weight) || 0 };

      let res;
      if (editingCategory) {
        res = await fetch(`http://127.0.0.1:8000/api/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("فشل الحفظ");

      setToast({
        show: true,
        message: editingCategory ? "تم تعديل الصنف بنجاح ✅" : "تمت إضافة الصنف بنجاح ✅",
      });
      setIsModalOpen(false);
      setForm({ name: "", weight: "" });
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "حدث خطأ أثناء الحفظ ❌" });
    }
  }

  // 🧩 حذف صنف
  async function handleDeleteCategory(id) {
    if (!window.confirm("هل تريد حذف هذا الصنف؟")) return;
    await fetch(`http://127.0.0.1:8000/api/categories/${id}`, { method: "DELETE" });
    setToast({ show: true, message: "تم حذف الصنف بنجاح 🗑️" });
    fetchCategories();
  }

  // 💱 تعديل سعر الصرف
  async function handleUpdateExchangeRate() {
    const newRate = prompt("أدخل سعر الصرف الجديد بالدينار الليبي:", exchangeRate);
    if (!newRate) return;
    await fetch("http://127.0.0.1:8000/api/exchange-rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rate: newRate }),
    });
    setToast({ show: true, message: "تم تحديث سعر الصرف 💱" });
    fetchExchangeRate();
  }

  // 🚚 تعديل سعر الشحن
  async function handleUpdateShippingRate() {
    const newRate = prompt("أدخل سعر الشحن الجديد (لكل كغ):", shippingRate);
    if (!newRate) return;
    await fetch("http://127.0.0.1:8000/api/shipping-rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rate: newRate }),
    });
    setToast({ show: true, message: "تم تحديث سعر الشحن 🚚" });
    fetchShippingRate();
  }

  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-8">
      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />

      {/* 🟨 العنوان الرئيسي */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">الإعدادات العامة</h1>
        <p className="text-sm text-gray-500 mb-1">قم بإدارة الأصناف وأسعار الصرف والشحن من هنا</p>
        <p className="text-sm text-gray-500">
          آخر تحديث:{" "}
          <span className="font-semibold text-[#E9AB1D]">
            {new Date().toLocaleString("ar-LY", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </motion.div>

      {/* 🧩 قسم الأصناف */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-[0_4px_20px_rgba(233,171,29,0.05)] space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">الأصناف</h2>
          <button
            onClick={() => {
              setEditingCategory(null);
              setForm({ name: "", weight: "" });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
          >
            <FaPlus /> إضافة صنف
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#fffaf1] text-[#1A1A1A] border-b border-[#E9AB1D]/30">
                <th className="py-4 text-sm font-semibold">اسم الصنف</th>
                <th className="py-4 text-sm font-semibold">الوزن (كغ)</th>
                <th className="py-4 text-sm font-semibold">التحكم</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <motion.tr
                    key={cat.id}
                    whileHover={{ backgroundColor: "rgba(233,171,29,0.07)" }}
                    className="border-b border-[#E9AB1D]/15 transition"
                  >
                    <td className="py-4 text-[15px] font-medium text-[#1A1A1A]">{cat.name}</td>
                    <td className="py-4 text-[15px] text-gray-600">{cat.weight}</td>
                    <td className="py-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setForm({ name: cat.name, weight: cat.weight });
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-[#fff9ef] border border-[#E9AB1D]/20 rounded-xl hover:bg-[#fff4d9] transition"
                      >
                        <FaEdit className="text-[#c98a00]" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2 bg-[#fff9f9] border border-red-200 rounded-xl hover:bg-red-100 transition"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-6 text-gray-500">
                    لا توجد أصناف مضافة بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 💱 سعر الصرف */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-[0_4px_20px_rgba(233,171,29,0.05)] flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">سعر الصرف</h2>
          <p className="text-gray-600 mt-1">
            1 دولار أمريكي ={" "}
            <span className="text-[#E9AB1D] font-semibold">{exchangeRate || "—"} دينار ليبي</span>
          </p>
        </div>
        <button
          onClick={handleUpdateExchangeRate}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
        >
          <FaMoneyBillWave /> تحديث
        </button>
      </motion.div>

      {/* 🚚 سعر الشحن */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-[0_4px_20px_rgba(233,171,29,0.05)] flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A]">سعر الشحن</h2>
          <p className="text-gray-600 mt-1">
            لكل كغ ={" "}
            <span className="text-[#E9AB1D] font-semibold">{shippingRate || "—"} دينار ليبي</span>
          </p>
        </div>
        <button
          onClick={handleUpdateShippingRate}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
        >
          <FaTruck /> تعديل
        </button>
      </motion.div>

      {/* 🪟 مودال الأصناف */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white/90 backdrop-blur-xl border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#1A1A1A]">
              {editingCategory ? "تعديل الصنف" : "إضافة صنف جديد"}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">اسم الصنف</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/20 focus:ring-2 focus:ring-[#E9AB1D]/40"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">الوزن (كغ)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
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
