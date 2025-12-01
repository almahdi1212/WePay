// src/pages/dashboard/DashboardShipments.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import {
  FaPlus,
  FaSearch,
  FaCheckCircle,
  FaTruckMoving,
  FaBox,
  FaChartLine,
  FaTrash,
  FaEdit,
  FaChevronLeft,
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

/* ======= خريطة الحالات ======= */
const STATUS_MAP = {
  1: { label: "تم تأكيد الطلب", color: "from-yellow-100 to-yellow-50 text-yellow-800" },
  2: { label: "تم شراء الطلب", color: "from-orange-100 to-orange-50 text-orange-800" },
  3: { label: "الطلبية جاهزة للاستلام", color: "from-blue-100 to-blue-50 text-blue-800" },
  4: { label: "تم التسليم", color: "from-emerald-100 to-emerald-50 text-emerald-800" },
};

/* ======= Toast component ======= */
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

/* ======= قسم إحصائيات الشحنات ======= */
const ShipmentsStats = React.memo(function ShipmentsStats({ data, chartData }) {
  return (
    <div className="space-y-10 bg-[#fdfcf9] p-4 sm:p-6 rounded-2xl">
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A]">إحصائيات الشحن</h1>
        <p className="text-sm text-gray-500">
          آخر تحديث: <span className="font-semibold text-[#E9AB1D]">{new Date().toLocaleString("ar-LY")}</span>
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6" initial="hidden" animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        {[
          { title: "تم تأكيد الطلب", code: 1, icon: <FaBox className="text-[#E9AB1D]" /> },
          { title: "تم شراء الطلب", code: 2, icon: <FaCheckCircle className="text-[#E9AB1D]" /> },
          { title: "الطلبية جاهزة للاستلام", code: 3, icon: <FaTruckMoving className="text-[#E9AB1D]" /> },
          { title: "تم التسليم", code: 4, icon: <FaCheckCircle className="text-[#E9AB1D]" /> },
        ].map((stat, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                      whileHover={{ scale: 1.05, backgroundColor: "#fffaf0", boxShadow: "0 0 25px rgba(233,171,29,0.25)" }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="bg-white border border-[#E9AB1D]/20 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-3 bg-[#E9AB1D]/10">
              {stat.icon}
            </div>
            <h3 className="text-sm text-gray-600 mb-1 text-center">{stat.title}</h3>
            <p className="text-2xl font-bold text-[#1A1A1A]">{data.filter((d) => Number(d.status_code) === stat.code).length}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="bg-white border border-[#E9AB1D]/20 rounded-3xl p-6 shadow-[0_4px_20px_rgba(233,171,29,0.05)]"
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
            <FaChartLine className="text-[#E9AB1D]" /> توزيع حالات الشحن الحالية
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 30, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5ecd1" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 13, fill: "#555" }} axisLine={{ stroke: "#E9AB1D", strokeWidth: 0.8 }} />
            <YAxis tick={{ fontSize: 13, fill: "#555" }} axisLine={{ stroke: "#E9AB1D", strokeWidth: 0.8 }} />
            <Tooltip contentStyle={{ backgroundColor: "#fffdf7", border: "1px solid #E9AB1D", borderRadius: "12px" }}
                     labelStyle={{ color: "#c98a00", fontWeight: 600 }} itemStyle={{ color: "#1A1A1A" }}
                     formatter={(value) => [`${value} شحنة`, "عدد الشحنات"]} />
            <Bar dataKey="value" fill="#E9AB1D" radius={[10, 10, 0, 0]} barSize={55} animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
});

/* ======= الصفحة الرئيسية ======= */
export default function DashboardShipments() {
  const [data, setData] = useState([]);
  // ملاحظة: لم نعد نجلب users تلقائياً لتفادي 401/تسجيل خروج مفاجئ عند وجود مشكلة بالتوكن.
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // اسم المستخدم المخزّن محلياً (من صفحة تسجيل الدخول)
  const loggedUsername = localStorage.getItem("username") || null;

  const [form, setForm] = useState({
    customer_name: "",
    customer_whatsapp: "",
    customer_location: "",
    price_usd: "",
    price_lyd: "",
    quantity: "",
    description: "",
    user_id: "",
    status_code: 1,
  });

  const [toast, setToast] = useState({ show: false, message: "" });
  const [selected, setSelected] = useState([]);
  const [bulkStatus, setBulkStatus] = useState(1);

  // ✅ جلب الشحنات
  const fetchShipments = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/shipments");
      const arr = Array.isArray(res?.data) ? res.data : res;
      setData(arr || []);
    } catch (err) {
      console.error(err);
      setFetchError("حدث خطأ أثناء جلب الشحنات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
    // لم نُدخل fetchUsers() هنا لتفادي مشاكل 401 التي كانت تسبب تسجيل خروج عند الدخول للصفحة
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("add") === "true") {
      setEditingRow(null);
      setForm({
        customer_name: "",
        customer_whatsapp: "",
        customer_location: "",
        price_usd: "",
        price_lyd: "",
        quantity: "",
        description: "",
        user_id: "",
        status_code: 1,
      });

      setIsModalOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, navigate, location.pathname]);

  // ✅ بيانات الرسم البياني
  const chartData = useMemo(() => {
    return [
      { name: "استلام", value: data.filter((d) => d.status_code === 1).length },
      { name: "غادر المستودع", value: data.filter((d) => d.status_code === 2).length },
      { name: "في الطريق", value: data.filter((d) => d.status_code === 3).length },
      { name: "تم التسليم", value: data.filter((d) => d.status_code === 4).length },
    ];
  }, [data]);

  /* ======= فلترة وبحث ======= */
  const filteredData = useMemo(() => {
    let arr = [...data];

    if (statusFilter !== "all")
      arr = arr.filter((i) => String(i.status_code) === String(statusFilter));

    // نحتفظ بفلتر الموظف كـ اختيار عام لكن لا نجلب قائمة المستخدمين افتراضياً
    if (userFilter !== "all")
      arr = arr.filter((i) => String(i.user_id) === String(userFilter));

    const q = globalFilter.trim().toLowerCase();
    if (q)
      arr = arr.filter(
        (i) =>
          String(i.tracking_number || "").toLowerCase().includes(q) ||
          String(i.customer_whatsapp || "").toLowerCase().includes(q) ||
          String(i.customer_name || "").toLowerCase().includes(q)
      );

    return arr;
  }, [data, statusFilter, userFilter, globalFilter]);

  /* ======= تحديث الحالة الجماعية ======= */
  const handleBulkUpdate = async () => {
    if (selected.length === 0) {
      setToast({ show: true, message: "❗ اختر شحنات لتحديث الحالة" });
      return;
    }

    try {
          await apiRequest(
        "/shipments/bulk-update",
        "PUT",
        {
          tracking_numbers: selected,
          status_code: Number(bulkStatus),
        },
        true
      );

      setToast({ show: true, message: "✅ تم تحديث الحالات بنجاح" });
      setIsBulkModalOpen(false);
      setSelected([]);
      await fetchShipments();
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ فشل في التحديث" });
    }
  };

  /* ======= الأعمدة ======= */
  const columns = useMemo(() => {
    const allSelected = filteredData.length > 0 && selected.length === filteredData.length;

    return [
      {
        id: "select",
        Header: () => (
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => {
              if (allSelected) setSelected([]);
              else setSelected(filteredData.map((r) => r.tracking_number));
            }}
          />
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selected.includes(row.original.tracking_number)}
            onChange={() => {
              const tn = row.original.tracking_number;
              setSelected((prev) =>
                prev.includes(tn)
                  ? prev.filter((t) => t !== tn)
                  : [...prev, tn]
              );
            }}
          />
        ),
      },
      {
        Header: "رقم الشحنة",
        accessor: "tracking_number",
        Cell: ({ value }) => <div className="font-medium">{value ?? "-"}</div>,
      },
      { Header: "الاسم", accessor: "customer_name" },
      { Header: "واتساب", accessor: "customer_whatsapp" },
      { Header: "المكان", accessor: "customer_location" },
      { Header: "السعر ($)", accessor: "price_usd" },
      { Header: "(LYD) السعر", accessor: "price_lyd" },
      { Header: "عدد القطع", accessor: "quantity" },
      {
        Header: "الموظف المسؤول",
        accessor: (row) => row.user?.name || row.user?.username || "-", // يعرض اسم المستخدم إن وُجد
      },
      {
        Header: "الحالة",
        accessor: "status_code",
        Cell: ({ value }) => {
          const s =
            STATUS_MAP[value] ||
            { label: "غير معروف", color: "from-gray-100 to-gray-50 text-gray-800" };

          return (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${s.color}`}
            >
              {s.label}
            </span>
          );
        },
      },
      {
        Header: "التحكم",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setEditingRow(row.original);
                setForm({
                  customer_name: row.original.customer_name || "",
                  customer_whatsapp: row.original.customer_whatsapp || "",
                  customer_location: row.original.customer_location || "",
                  price_usd: row.original.price_usd || "",
                  price_lyd: row.original.price_lyd || "",
                  quantity: row.original.quantity || "",
                  description: row.original.description || "",
                  user_id: row.original.user_id || "",
                  status_code: row.original.status_code || 1,
                });
                setIsModalOpen(true);
              }}
              className="text-[#E9AB1D] hover:text-[#c98a00] transition"
              title="تعديل"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => handleDelete(row.original.tracking_number)}
              className="text-red-500 hover:text-red-700 transition"
              title="حذف"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ];
  }, [filteredData, selected]);

  /* ======= إعداد الجدول ======= */
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
    state: { pageIndex, pageSize },
    pageOptions,
    setPageSize,
  } = useTable(
    { columns, data: filteredData, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // ✅ تعديل رقم الواتساب ليبدأ بـ "09" وبحد أقصى 10 أرقام
  const handleWhatsappChange = (val) => {
    let digits = String(val || "").replace(/\D/g, "");
    if (digits === "") {
      setForm((f) => ({ ...f, customer_whatsapp: "" }));
      return;
    }
    if (!digits.startsWith("09")) digits = "09" + digits.replace(/^0+/, "");
    digits = digits.slice(0, 10);
    setForm((f) => ({ ...f, customer_whatsapp: digits }));
  };

  // ✅ حفظ (إضافة / تعديل)
  const handleSave = async (e) => {
    e.preventDefault();

    // بناء البايلود؛ **لا نرسل user_id عند الإضافة** حتى يستخدم الباك-إند auth()->id()
    const payload = {
      customer_name: form.customer_name || null,
      customer_whatsapp: form.customer_whatsapp || null,
      customer_location: form.customer_location || null,
      price_usd: form.price_usd ? Number(form.price_usd) : null,
      price_lyd: form.price_lyd ? Number(form.price_lyd) : null,
      quantity: form.quantity ? Number(form.quantity) : null,
      description: form.description || null,
      // user_id: form.user_id ? Number(form.user_id) : null, // لا تُضمّن عند الإنشاء
      status_code: form.status_code ? Number(form.status_code) : 1,
    };

    // عند التعديل نحتفظ بالحقل user_id في البايلود كي لا نغيّره (لكن لن نسمح بتغييره عبر الواجهة)
    if (editingRow) {
      // لو كان في form.user_id قيمة واضحة (من قبل)، نحفظها كمعلومة لكن لا نسمح بتغييرها من الواجهة
      if (form.user_id) payload.user_id = Number(form.user_id);
    }

    try {
      if (editingRow) {
        await apiRequest(
          `/shipments/${editingRow.tracking_number}`,
          "PUT",
          payload,
          true
        );
        setToast({ show: true, message: "✅ تم تحديث الشحنة بنجاح" });
        // بعد التحديث نعيد جلب الشحنات لضمان التزامن
        await fetchShipments();
      } else {
        // إنشاء جديد — لا نرسل user_id عمدًا
        const res = await apiRequest("/shipments", "POST", payload, true);
        // استخرج الشحنة التي أُعيدت
        const created = res?.data || res;
        // لو الـ backend لم يُضمّن علاقة user داخل الاستجابة، أضف اسم المستخدم محليًا لعرضه فورًا
        if (created) {
          if (!created.user && loggedUsername) {
            created.user = { name: loggedUsername };
            created.user_id = null; // غير معروف من الباك إن لم يرجع
          }
          // أضف الشحنة للواجهة فورًا في أعلى القائمة
          setData((prev) => [created, ...prev]);
        } else {
          // كإجراء احتياطي نجلب الشحنات كاملة
          await fetchShipments();
        }
        setToast({ show: true, message: "✅ تم إنشاء الشحنة بنجاح" });
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ حدث خطأ أثناء الحفظ" });
    }
  };

  // ✅ حذف
  const handleDelete = async (tracking_number) => {
    if (!window.confirm(`هل تريد حذف الشحنة ${tracking_number}؟`)) return;
    try {
      await apiRequest(`/shipments/${tracking_number}`, "DELETE", null, true);
      setToast({ show: true, message: "🗑️ تم حذف الشحنة بنجاح" });
      fetchShipments();
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: "❌ فشل في الحذف" });
    }
  };

  // واجهة الصفحة
  return (
    <div className="p-8 bg-[#fdfcf9] min-h-screen space-y-10">
      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ show: false, message: "" })}
      />

      <ShipmentsStats data={data} chartData={chartData} />

      {/* أدوات الفلترة والبحث */}
      <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="relative flex-1">
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="ابحث برقم الشحنة أو الاسم أو رقم الواتساب..."
            className="w-full text-[15px] font-medium placeholder-gray-400 text-[#1A1A1A] bg-white border border-[#E9AB1D]/40 shadow-sm px-5 py-3 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-[#E9AB1D]/40 transition"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#E9AB1D]/80 text-lg" />
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-56 px-4 py-3 rounded-xl bg-white border border-[#E9AB1D]/40 text-gray-700 font-medium focus:ring-2 focus:ring-[#E9AB1D]/40 outline-none transition"
          >
            <option value="all">كل الحالات</option>
            {Object.entries(STATUS_MAP).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>

          {/* فلتر الموظف — نحتفظ بمربع ثابت (قابِل للتطوير لاحقًا) */}
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-56 px-4 py-3 rounded-xl bg-white border border-[#E9AB1D]/40 text-gray-700 font-medium focus:ring-2 focus:ring-[#E9AB1D]/40 outline-none transition"
          >
            <option value="all">كل الموظفين</option>
            {/* إن أردت لاحقاً: جلب المستخدمين عند الحاجة وعرضهم هنا */}
          </select>

          {/* زر إضافة */}
          <button
            onClick={() => {
              setEditingRow(null);
              setForm({
                customer_name: "",
                customer_whatsapp: "",
                customer_location: "",
                price_usd: "",
                price_lyd: "",
                quantity: "",
                description: "",
                user_id: "",
                status_code: 1,
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] shadow-md hover:opacity-95 transition"
          >
            <FaPlus /> إضافة شحنة
          </button>
        </div>
      </div>

      {/* جدول الشحنات */}
      <div className="overflow-x-auto bg-white border border-[#E9AB1D]/30 rounded-2xl p-4 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-[#E9AB1D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : fetchError ? (
          <div className="text-center text-red-600 py-8">{fetchError}</div>
        ) : (
          <table {...getTableProps()} className="w-full text-sm">
            <thead>
              {headerGroups.map((hg) => {
                const headerGroupProps = hg.getHeaderGroupProps();
                const { key: headerKey, ...headerRest } = headerGroupProps;

                return (
                  <tr key={headerKey} {...headerRest}>
                    {hg.headers.map((col) => {
                      const colProps = col.getHeaderProps(col.getSortByToggleProps());
                      const { key: colKey, ...colRest } = colProps;
                      return (
                        <th
                          key={colKey}
                          {...colRest}
                          className="py-3 px-2 text-right text-[14px] font-semibold border-b border-[#E9AB1D]/20"
                        >
                          {col.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>

            <tbody {...getTableBodyProps()} className="divide-y divide-[#E9AB1D]/10">
              {page.map((row) => {
                prepareRow(row);
                const rowProps = row.getRowProps();
                const { key, ...rowRest } = rowProps;

                return (
                  <tr key={key} {...rowRest} className="hover:bg-[#fffaf6] transition">
                    {row.cells.map((cell) => {
                      const cellProps = cell.getCellProps();
                      const { key: cellKey, ...cellRest } = cellProps;
                      return (
                        <td key={cellKey} {...cellRest} className="py-3 px-2 text-gray-700 align-middle">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

          </table>
        )}

        {/* شريط الصفحات وأزرار */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 text-sm text-gray-700 gap-3">
          <div className="flex items-center gap-2">
            عرض{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-[#E9AB1D]/40 rounded-lg px-2 py-1 bg-white text-[#E9AB1D] font-semibold focus:ring-2 focus:ring-[#E9AB1D]/30 outline-none"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{" "}
            صف في الصفحة
          </div>

          <div>
            عرض{" "}
            <span className="font-semibold text-[#E9AB1D]">
              {page.length}
            </span>{" "}
            من أصل{" "}
            <span className="font-semibold text-[#E9AB1D]">
              {filteredData.length}
            </span>{" "}
            شحنة
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                canPreviousPage
                  ? "border-[#E9AB1D]/40 text-[#E9AB1D] hover:bg-[#fff7e1]"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FaChevronRight />
            </button>

            <span className="px-3">
              الصفحة{" "}
              <span className="font-semibold text-[#E9AB1D]">
                {pageIndex + 1}
              </span>{" "}
              من{" "}
              <span className="font-semibold text-[#E9AB1D]">
                {pageOptions.length}
              </span>
            </span>

            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                canNextPage
                  ? "border-[#E9AB1D]/40 text-[#E9AB1D] hover:bg-[#fff7e1]"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>

        {/* زر فتح نافذة تحديث الحالات */}
        <div className="mt-4">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            disabled={selected.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              selected.length > 0
                ? "border-[#E9AB1D]/40 text-[#E9AB1D] hover:bg-[#fff7e1]"
                : "border-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="تحديث الحالة الجماعية"
          >
            ⚙️ تعديل الحالات
          </button>
        </div>
      </div>

      {/* مودال الإضافة / التعديل */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-50 bg-white border border-[#E9AB1D]/30 rounded-2xl p-6 shadow-2xl w-full max-w-xl"
          >
            <h3 className="text-lg font-semibold mb-3">
              {editingRow
                ? `تعديل الشحنة (${editingRow.tracking_number})`
                : "إضافة شحنة جديدة"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  placeholder="اسم الزبون"
                  value={form.customer_name}
                  onChange={(e) =>
                    setForm({ ...form, customer_name: e.target.value })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />
                <input
                  placeholder="رقم الواتساب (09xxxxxxx)"
                  value={form.customer_whatsapp}
                  onChange={(e) => handleWhatsappChange(e.target.value)}
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />
                <input
                  placeholder="المكان"
                  value={form.customer_location}
                  onChange={(e) =>
                    setForm({ ...form, customer_location: e.target.value })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="السعر بالدولار"
                  value={form.price_usd}
                  onChange={(e) =>
                    setForm({ ...form, price_usd: e.target.value })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="السعر بالدينار"
                  value={form.price_lyd}
                  onChange={(e) =>
                    setForm({ ...form, price_lyd: e.target.value })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="عدد القطع"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                />

                {/* ===== سلوك الموظف: عند الإضافة نخفي الحقل؛ عند التعديل نعرضه كـ readonly ===== */}
                {editingRow ? (
                  <input
                    type="text"
                    readOnly
                    value={
                      // عرض اسم الموظف المسؤول (من العلاقة user) أو اسم المستخدم المخزون محلياً كـ fallback
                      (editingRow.user && (editingRow.user.name || editingRow.user.username)) ||
                      loggedUsername ||
                      ""
                    }
                    className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2 bg-gray-50"
                  />
                ) : null}

                <select
                  value={form.status_code}
                  onChange={(e) =>
                    setForm({ ...form, status_code: Number(e.target.value) })
                  }
                  className="border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
                >
                  {Object.entries(STATUS_MAP).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="الوصف (اختياري)"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border border-[#E9AB1D]/30 rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#E9AB1D]/30"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white"
                >
                  {editingRow ? "حفظ التعديل" : "إضافة الشحنة"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* نافذة تحديث الحالات الجماعية */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-[#E9AB1D]/30 shadow-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
              تحديث حالة {selected.length} شحنة
            </h2>

            <select
              value={bulkStatus}
              onChange={(e) => setBulkStatus(Number(e.target.value))}
              className="w-full border border-[#E9AB1D]/30 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-[#E9AB1D]/40 outline-none"
            >
              {Object.entries(STATUS_MAP).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white border border-[#E9AB1D]/30"
              >
                إلغاء
              </button>
              <button
                onClick={handleBulkUpdate}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white shadow-md hover:opacity-95"
              >
                تأكيد التحديث
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
