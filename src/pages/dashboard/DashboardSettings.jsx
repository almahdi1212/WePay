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

  function showToast(message) {
    setToast({ show: true, message });
  }

  // 🧩 جلب الأصناف
  async function fetchCategories() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories");
      const data = await res.json();
      const list = Array.isArray(data.data) ? data.data : data;
      const normalized = list.map((cat) => ({
        id: cat.id,
        name: cat.name,
        weight: cat.approx_weight ?? cat.weight ?? 0,
      }));
      setCategories(normalized);
    } catch (err) {
      console.error("❌ فشل في جلب الأصناف:", err);
      showToast("حدث خطأ أثناء جلب الأصناف");
    }
  }

  // 💱 جلب سعر الصرف
  async function fetchExchangeRate() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/exchange-rate");
      const data = await res.json();
      setExchangeRate(data?.rate ?? data?.data?.rate ?? 0);
    } catch (err) {
      console.error("❌ فشل في جلب سعر الصرف:", err);
      showToast("تعذر جلب سعر الصرف");
    }
  }

  // 🚚 جلب سعر الشحن
  async function fetchShippingRate() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/shipping-rate");
      const data = await res.json();
      setShippingRate(data?.rate ?? data?.data?.rate ?? 0);
    } catch (err) {
      console.error("❌ فشل في جلب سعر الشحن:", err);
      showToast("تعذر جلب سعر الشحن");
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchExchangeRate();
    fetchShippingRate();
  }, []);

  // 🧩 حفظ أو تعديل صنف
  async function handleSaveCategory(e) {
    e.preventDefault();

    const name = form.name.trim();
    const approx_weight = parseFloat(form.weight);

    if (!name || isNaN(approx_weight)) {
      showToast("أدخل اسم الصنف والوزن بشكل صحيح");
      return;
    }

    const payload = { name, approx_weight };
    try {
      let res;
      if (editingCategory?.id) {
        res = await fetch(`http://127.0.0.1:8000/api/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("فشل في الحفظ");
      showToast(editingCategory ? "✅ تم تعديل الصنف" : "✅ تم إضافة الصنف");
      setIsModalOpen(false);
      setEditingCategory(null);
      setForm({ name: "", weight: "" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء الحفظ");
    }
  }

  // 🗑️ حذف صنف
  async function handleDeleteCategory(id) {
    if (!window.confirm("هل تريد حذف هذا الصنف؟")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("فشل الحذف");
      showToast("🗑️ تم حذف الصنف");
      fetchCategories();
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء الحذف");
    }
  }

  // 💱 تحديث سعر الصرف (معدل حسب backend)
  async function handleUpdateExchangeRate() {
    const newRate = prompt("أدخل سعر الصرف الجديد بالدينار الليبي:", exchangeRate ?? 0);
    if (newRate === null) return;
    const parsed = parseFloat(newRate);
    if (isNaN(parsed)) {
      showToast("❌ أدخل قيمة رقمية صحيحة");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/exchange-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          rate: parsed,
          currency_from: "USD",
          currency_to: "LYD",
        }),
      });

      if (!res.ok) throw new Error("فشل في تحديث سعر الصرف");
      setExchangeRate(parsed);
      showToast("✅ تم تحديث سعر الصرف بنجاح");
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء تحديث سعر الصرف");
    }
  }

  // 🚚 تحديث سعر الشحن (سيُحدث بعد معرفة backend)
  async function handleUpdateShippingRate() {
    const newRate = prompt("أدخل سعر الشحن الجديد (لكل كغ):", shippingRate ?? 0);
    if (newRate === null) return;
    const parsed = parseFloat(newRate);
    if (isNaN(parsed)) {
      showToast("أدخل قيمة رقمية صحيحة لسعر الشحن");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/shipping-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ rate: parsed }),
      });
      if (!res.ok) throw new Error("فشل تحديث سعر الشحن");
      setShippingRate(parsed);
      showToast("✅ تم تحديث سعر الشحن");
    } catch (err) {
      console.error(err);
      showToast("❌ حدث خطأ أثناء تحديث سعر الشحن");
    }
  }

  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-8">
      <Toast show={toast.show} message={toast.message} onClose={() => setToast({ show: false, message: "" })} />

      {/* 🟨 العنوان */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-[#1A1A1A]">الإعدادات العامة</h1>
        <p className="text-gray-500 text-sm">
          قم بإدارة الأصناف وأسعار الصرف والشحن من هنا
        </p>
      </motion.div>

      {/* 🧩 قسم الأصناف */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-[#E9AB1D]/30 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">الأصناف</h2>
            <button onClick={() => { setEditingCategory(null); setForm({ name: "", weight: "" }); setIsModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white shadow hover:opacity-95">
              <FaPlus /> إضافة صنف
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-[#fffaf1] border-b border-[#E9AB1D]/30">
                  <th className="py-3">اسم الصنف</th>
                  <th className="py-3">الوزن (كغ)</th>
                  <th className="py-3">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <tr key={cat.id} className="border-b border-[#E9AB1D]/15 hover:bg-[#fffaf0] transition">
                      <td>{cat.name}</td>
                      <td>{cat.weight}</td>
                      <td className="flex justify-center gap-2 py-2">
                        <button onClick={() => { setEditingCategory(cat); setForm({ name: cat.name, weight: cat.weight }); setIsModalOpen(true); }}
                          className="p-2 border rounded-lg border-[#E9AB1D]/30 hover:bg-[#fff4d9]">
                          <FaEdit className="text-[#c98a00]" />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat.id)}
                          className="p-2 border rounded-lg border-red-300 hover:bg-red-100">
                          <FaTrash className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" className="py-5 text-gray-500">لا توجد أصناف مضافة بعد</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* 💱 سعر الصرف */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-md flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">سعر الصرف</h2>
            <p className="text-gray-600 mt-1">
              1 دولار أمريكي = <span className="text-[#E9AB1D] font-semibold">{exchangeRate ?? "—"} دينار ليبي</span>
            </p>
          </div>
          <button onClick={handleUpdateExchangeRate}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white shadow hover:opacity-95">
            <FaMoneyBillWave /> تحديث
          </button>
        </div>
      </motion.div>

      {/* 🚚 سعر الشحن */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-md flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">سعر الشحن</h2>
            <p className="text-gray-600 mt-1">
              لكل كغ = <span className="text-[#E9AB1D] font-semibold">{shippingRate ?? "—"} دينار ليبي</span>
            </p>
          </div>
          <button onClick={handleUpdateShippingRate}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white shadow hover:opacity-95">
            <FaTruck /> تعديل
          </button>
        </div>
      </motion.div>

      {/* 🪟 مودال الأصناف */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl border border-[#E9AB1D]/20 p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-semibold mb-3 text-[#1A1A1A]">
              {editingCategory ? "تعديل الصنف" : "إضافة صنف جديد"}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">اسم الصنف</label>
                <input required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E9AB1D]/20 rounded-lg focus:ring-2 focus:ring-[#E9AB1D]/40" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">الوزن (كغ)</label>
                <input required type="number" step="0.01" min="0" value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E9AB1D]/20 rounded-lg focus:ring-2 focus:ring-[#E9AB1D]/40" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E9AB1D]/20 rounded-lg">إلغاء</button>
                <button type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white rounded-lg">حفظ</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
