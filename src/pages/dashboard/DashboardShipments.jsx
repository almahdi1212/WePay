import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "../../api/api";

import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaChevronLeft,
  FaBoxOpen,
  FaWarehouse,
  FaTruckMoving,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* 🟡 حالة الشحنات */
const STATUS_MAP = {
  1: { label: "تم استلام الشحنة من المتجر", color: "from-yellow-100 to-yellow-50 text-yellow-800" },
  2: { label: "الشحنة غادرت المستودع", color: "from-orange-100 to-orange-50 text-orange-800" },
  3: { label: "في الطريق إلى طرابلس", color: "from-blue-100 to-blue-50 text-blue-800" },
  4: { label: "تم تسليم الشحنة بنجاح", color: "from-emerald-100 to-emerald-50 text-emerald-800" },
};

/* 🟢 Toast */
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
      <div className="bg-white/80 backdrop-blur-md border border-[#E9AB1D]/30 text-[#1A1A1A] px-5 py-2 rounded-full shadow-md font-medium">
        {message}
      </div>
    </motion.div>
  );
}
export default function DashboardShipments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [form, setForm] = useState({ tracking_number: "", status_code: 1 });
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, shipment: null });

  /* 🟤 جلب الشحنات */
  const fetchShipments = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await apiRequest("/shipments");
      const arr = Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [];
      const norm = arr.map((s) => ({
        id: s.id,
        tracking_number: s.tracking_number || "",
        status_code: Number(s.status_code ?? 0),
        created_at: s.created_at ?? null,
        updated_at: s.updated_at ?? null,
      }));
      setData(norm);
    } catch (err) {
      console.error(err);
      setFetchError("حدث خطأ أثناء جلب البيانات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  /* 🟣 الأعمدة */
  const columns = useMemo(
    () => [
      {
        Header: "رقم الشحنة",
        accessor: "tracking_number",
        Cell: ({ value }) => <div className="font-medium text-[#1A1A1A]">{value}</div>,
      },
      {
        Header: "الحالة",
        accessor: "status_code",
        Cell: ({ value }) => {
          const s = STATUS_MAP[value] || { label: "غير معروف", color: "from-gray-100 to-gray-50 text-gray-700" };
          return (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${s.color}`}>
              {s.label}
            </span>
          );
        },
      },
      {
        Header: "تاريخ الإنشاء",
        accessor: "created_at",
        Cell: ({ value }) => (value ? new Date(value).toLocaleDateString("ar-LY") : "-"),
      },
      {
        Header: "آخر تحديث",
        accessor: "updated_at",
        Cell: ({ value }) => (value ? new Date(value).toLocaleDateString("ar-LY") : "-"),
      },
      {
        Header: "التحكم",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => openEditModal(row.original)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-[#E9AB1D]/20 shadow-sm hover:scale-105 transition"
              title="تعديل"
            >
              <FaEdit className="text-[#c98a00]" />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-[#E9AB1D]/20 shadow-sm hover:scale-105 transition"
              title="حذف"
            >
              <FaTrash className="text-red-500" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  /* 🟡 فتح / إغلاق المودال */
  function openAddModal() {
    setEditingRow(null);
    setForm({ tracking_number: "", status_code: 1 });
    setIsModalOpen(true);
  }
  function openEditModal(row) {
    setEditingRow(row);
    setForm({ tracking_number: row.tracking_number, status_code: row.status_code });
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setEditingRow(null);
  }
  /* 💾 الحفظ (إضافة أو تعديل) */
  async function handleSave(e) {
    e.preventDefault();
    const payload = { 
      tracking_number: form.tracking_number, 
      status_code: Number(form.status_code) 
    };

    try {
      if (editingRow) {
        await apiRequest(`/shipments/${editingRow.tracking_number}`, "PUT", payload, true);
        setToast({ show: true, message: "✅ تم تعديل الشحنة بنجاح" });
      } else {
        await apiRequest("/shipments", "POST", payload, true);
        setToast({ show: true, message: "✅ تمت إضافة الشحنة بنجاح" });
      }

      await fetchShipments();
      closeModal();
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ حدث خطأ أثناء الحفظ" });
    }
  }

  /* 🗑️ الحذف */
  function handleDelete(row) {
    setDeleteConfirm({ show: true, shipment: row });
  }

  async function confirmDelete() {
    const row = deleteConfirm.shipment;
    if (!row) return;

    try {
      await apiRequest(`/shipments/${row.tracking_number}`, "DELETE", null, true);
      await fetchShipments();
      setToast({ show: true, message: "🗑️ تم حذف الشحنة بنجاح" });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ حدث خطأ أثناء الحذف" });
    } finally {
      setDeleteConfirm({ show: false, shipment: null });
    }
  }

  /* ⚙️ إعداد الجدول */
  const filteredData = useMemo(() => {
    let arr = [...data];
    if (statusFilter !== "all") arr = arr.filter((i) => String(i.status_code) === String(statusFilter));
    const q = globalFilter.trim().toLowerCase();
    if (q) {
      arr = arr.filter(
        (i) =>
          String(i.tracking_number || "").toLowerCase().includes(q) ||
          String(i.id || "").toLowerCase().includes(q)
      );
    }
    return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [data, statusFilter, globalFilter]);

  /* 📊 بيانات الرسم البياني */
  const chartData = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    data.forEach((d) => {
      if (counts[d.status_code] !== undefined) counts[d.status_code]++;
    });
    return Object.keys(STATUS_MAP).map((key) => ({
      name: STATUS_MAP[key].label,
      value: counts[key],
      color:
        key === "1"
          ? "#FACC15"
          : key === "2"
          ? "#FB923C"
          : key === "3"
          ? "#3B82F6"
          : "#22C55E",
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    pageOptions,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: filteredData, initialState: { pageIndex: 0, pageSize: 8 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-8">
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />

      {/* 🟨 العنوان الرئيسي + الشارت */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-[0_4px_20px_rgba(233,171,29,0.05)] space-y-8"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">
            الشحنات
          </h1>
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
        </div>

        {/* 📊 الشارت */}
        <div className="bg-gradient-to-br from-[#fffdf5] to-[#fff] border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-inner">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3E8C1" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#1A1A1A", fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#1A1A1A" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffdf7",
                  borderRadius: "12px",
                  border: "1px solid #E9AB1D40",
                  fontSize: "14px",
                  boxShadow: "0 4px 12px rgba(233,171,29,0.15)",
                }}
              />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                fill="#E9AB1D"
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

{/* 🟩 جدول الشحنات + أدوات التحكم */}
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, delay: 0.08 }}
  className="bg-white border border-[#E9AB1D]/30 rounded-3xl p-8 shadow-[0_4px_20px_rgba(233,171,29,0.05)] space-y-6"
>
  <div>
    <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-1">البحث</h2>
    <p className="text-sm text-gray-500">
      يمكنك البحث عن الشحنات حسب الرقم أو الحالة
    </p>
  </div>

  {/* شريط الأدوات */}
  <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
    {/* مربع البحث */}
    <div className="relative flex-1 md:order-1 order-1 w-full">
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="ابحث عن رقم الشحنة أو المعرف..."
        className="w-full text-[15px] font-medium placeholder-gray-400 text-[#1A1A1A] bg-white/60 border border-white/30 shadow-md px-5 py-3 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-[#E9AB1D]/40 transition-all"
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E9AB1D]/80 text-lg" />
    </div>

    {/* القائمة المنسدلة */}
    <div className="relative md:w-72 w-full md:order-2 order-2">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full appearance-none px-4 py-3 pr-10 rounded-lg bg-white border border-[#E9AB1D]/20 text-gray-700 focus:ring-2 focus:ring-[#E9AB1D]/30 outline-none transition"
      >
        <option value="all">كل الحالات</option>
        <option value={1}>تم استلام الشحنة من المتجر</option>
        <option value={2}>الشحنة غادرت المستودع</option>
        <option value={3}>في الطريق إلى طرابلس</option>
        <option value={4}>تم تسليم الشحنة بنجاح</option>
      </select>

      {/* السهم الصغير */}
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-[#E9AB1D]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* زر الإضافة */}
    <button
      onClick={openAddModal}
      className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition md:order-3 order-3"
    >
      <FaPlus /> إضافة شحنة
    </button>
  </div>
</motion.div>




      {/* 📋 الجدول */}
      <div className="bg-white/40 border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-md backdrop-blur-sm">
        {loading ? (
          <div className="flex items-center justify-center h-44">
            <div className="w-12 h-12 border-4 border-[#E9AB1D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : fetchError ? (
          <div className="text-center text-red-600 py-8">{fetchError}</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-[#E9AB1D]/20">
              <table {...getTableProps()} className="w-full text-sm border-collapse">
                <thead className="bg-[#fffdf5] text-[#1A1A1A]">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className="py-3 px-4 text-[15px] font-semibold border-b border-[#E9AB1D]/20 text-right"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="divide-y divide-[#E9AB1D]/10">
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <motion.tr
                        {...row.getRowProps()}
                        whileHover={{ backgroundColor: "rgba(233,171,29,0.06)" }}
                        className="transition"
                      >
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="py-3 px-4 text-gray-800 align-middle">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 📄 التنقل بين الصفحات */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-700">
              <div>
                عرض{" "}
                <span className="font-semibold text-[#E9AB1D]">
                  {filteredData.length === 0 ? 0 : pageIndex * pageSize + 1}
                </span>{" "}
                إلى{" "}
                <span className="font-semibold text-[#E9AB1D]">
                  {Math.min((pageIndex + 1) * pageSize, filteredData.length)}
                </span>{" "}
                من{" "}
                <span className="font-semibold text-[#E9AB1D]">
                  {filteredData.length}
                </span>{" "}
                شحنة
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                  className={`p-2 rounded-lg border border-[#E9AB1D]/30 hover:bg-[#E9AB1D]/10 transition ${
                    !canPreviousPage ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <FaChevronLeft />
                </button>
                <span className="px-3 py-2 rounded-lg border border-[#E9AB1D]/20 bg-white shadow-sm">
                  {pageIndex + 1} / {pageOptions.length}
                </span>
                <button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                  className={`p-2 rounded-lg border border-[#E9AB1D]/30 hover:bg-[#E9AB1D]/10 transition ${
                    !canNextPage ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      

      
        {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white/90 backdrop-blur-xl border border-[#E9AB1D]/20 rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#1A1A1A]">
              {editingRow ? "تعديل الشحنة" : "إضافة شحنة جديدة"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">رقم الشحنة</label>
                <input
                  required
                  value={form.tracking_number}
                  onChange={(e) =>
                    setForm({ ...form, tracking_number: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#E9AB1D]/10 focus:ring-2 focus:ring-[#E9AB1D]/30"
                />
              </div>

              {/* اختيار الحالة (تصميم نظيف وأنيق) */}
<div>
  <label className="block text-sm text-gray-600 mb-1">الحالة</label>

  <div className="relative">
    <select
      required
      value={form.status_code}
      onChange={(e) => setForm({ ...form, status_code: Number(e.target.value) })}
      className="w-full appearance-none px-4 py-2.5 pr-8 rounded-lg bg-white border border-[#E9AB1D]/25 text-[#1A1A1A] font-medium focus:ring-2 focus:ring-[#E9AB1D]/30 focus:border-[#E9AB1D]/40 outline-none transition-all duration-150"
    >
      <option value={1}>تم استلام الشحنة من المتجر</option>
      <option value={2}>الشحنة غادرت المستودع</option>
      <option value={3}>في الطريق إلى طرابلس</option>
      <option value={4}>تم تسليم الشحنة بنجاح</option>
    </select>

    {/* السهم الذهبي الأنيق */}
    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <svg
        className="w-4 h-4 text-[#E9AB1D]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>


              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-white/40 border"
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

      {/* 🧨 مودال تأكيد الحذف */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDeleteConfirm({ show: false, shipment: null })}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white/90 backdrop-blur-xl border border-red-200 rounded-2xl p-6 shadow-2xl w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-3 text-[#1A1A1A]">
              تأكيد الحذف
            </h3>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد أنك تريد حذف الشحنة رقم{" "}
              <span className="text-red-600 font-bold">
                {deleteConfirm.shipment?.tracking_number}
              </span>
              ؟
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm({ show: false, shipment: null })}
                className="px-4 py-2 rounded-lg bg-white/40 border border-red-200 hover:bg-white/60 transition"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-white hover:opacity-90 transition"
              >
                تأكيد الحذف
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
