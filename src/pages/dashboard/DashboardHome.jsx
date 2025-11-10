import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBox,
  FaDollarSign,
  FaSyncAlt,
  FaChartLine,
  FaTruck,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    shipments: 0,
    updates: 0,
    exchangeRate: 0,
    shippingRate: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [glow, setGlow] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("☀️");

  // 🕒 التحية
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("صباح الخير");
      setEmoji("☀️");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("مساء الخير");
      setEmoji("🌤️");
    } else {
      setGreeting("مساء الخير");
      setEmoji("🌙");
    }
  }, []);

  // ✨ تأثير الوميض
  useEffect(() => {
    const timer = setTimeout(() => setGlow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 🔄 جلب بيانات لوحة التحكم
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [shipmentsRes, updatesRes, rateRes, shippingRes] = await Promise.all([
          fetch("https://wepay-backend-y41w.onrender.com/api/shipments"),
          fetch("https://wepay-backend-y41w.onrender.com/api/updates"),
          fetch("https://wepay-backend-y41w.onrender.com/api/exchange-rate"),
          fetch("https://wepay-backend-y41w.onrender.com/api/shipping-rate"),
        ]);

        const shipmentsJson = await shipmentsRes.json();
        const updatesJson = await updatesRes.json();
        const rateJson = await rateRes.json();
        const shippingRateJson = await shippingRes.json();

        const shipmentsArray =
          shipmentsJson?.data && Array.isArray(shipmentsJson.data)
            ? shipmentsJson.data
            : Array.isArray(shipmentsJson)
            ? shipmentsJson
            : [];

        const updatesArray =
          updatesJson?.data && Array.isArray(updatesJson.data)
            ? updatesJson.data
            : Array.isArray(updatesJson)
            ? updatesJson
            : [];

        // 🗓️ إنشاء بيانات الرسم البياني الشهري
        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("ar-LY", { month: "long" }),
          shipments: 0,
        }));

        shipmentsArray.forEach((sh) => {
          const dateStr = sh.created_at ?? sh.createdAt ?? sh.date ?? null;
          if (dateStr) {
            const date = new Date(dateStr);
            if (!isNaN(date)) {
              monthlyData[date.getMonth()].shipments++;
            }
          }
        });

        setChartData(monthlyData);

        setStats({
          shipments: shipmentsArray.length || 0,
          updates: updatesArray.length || 0,
          exchangeRate: rateJson?.data?.rate ?? rateJson?.rate ?? 0,
          shippingRate: shippingRateJson?.rate_per_kg ?? 0,
        });

        setLastUpdated(
          new Date().toLocaleString("ar-LY", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        setLoading(false);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
        setError("حدث خطأ أثناء تحميل البيانات ❌");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <motion.div
          className="w-14 h-14 border-4 border-[#E9AB1D]/80 border-t-transparent rounded-full animate-spin mb-5 shadow-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <p className="text-gray-600 font-medium">جارٍ تحميل البيانات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-600 text-lg font-semibold mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#E9AB1D] text-white px-4 py-2 rounded-xl shadow hover:bg-[#c98a00] transition-all"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // 🎯 البطاقات (بدون الأصناف)
  const statsCards = [
    { title: "إجمالي الشحنات", value: stats.shipments, icon: <FaBox />, color: "#E9AB1D" },
    { title: "سعر الصرف", value: `${stats.exchangeRate} LYD`, icon: <FaDollarSign />, color: "#E9AB1D" },
    { title: "سعر الشحن", value: `${stats.shippingRate} LYD`, icon: <FaTruck />, color: "#c98a00" },
    { title: "آخر التحديثات", value: stats.updates, icon: <FaSyncAlt />, color: "#E9AB1D" },
  ];

  return (
    <div className="space-y-10 min-h-screen bg-[#fdfcf9] p-4 sm:p-6 rounded-2xl">
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1 text-[#1A1A1A]">لوحة التحكم</h1>
        <p className="text-sm text-gray-500">
          آخر تحديث: <span className="font-semibold text-[#E9AB1D]">{lastUpdated}</span>
        </p>
      </motion.div>

      {/* الترحيب */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-[#fffaf1] to-[#fffdf9] border border-[#E9AB1D]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_12px_rgba(233,171,29,0.05)] flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
            {emoji} {greeting} <span className="text-[#E9AB1D] font-semibold">Admin</span>
          </h2>
          <p className="text-sm text-gray-600">إليك نظرة عامة على لوحة التحكم الخاصة بك لهذا اليوم.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-4 sm:mt-0 text-sm font-medium italic bg-[#fff8e0]/60 px-4 py-2 rounded-full border border-[#E9AB1D]/20 shadow-sm ${
            glow
              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#E9AB1D] via-[#f9d85c] to-[#c98a00] animate-[shimmer_2s_linear_infinite]"
              : "text-[#E9AB1D]"
          }`}
          style={{ backgroundSize: "200% auto" }}
        >
          نظام WePay جاهز للعمل
        </motion.div>
      </motion.div>

      {/* بطاقات الإحصاءات */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fffaf0",
              boxShadow: "0 0 25px rgba(233,171,29,0.25)",
              borderColor: "rgba(233,171,29,0.6)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="bg-white border border-[#E9AB1D]/20 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-12 h-12 flex items-center justify-center rounded-xl mb-3 bg-[#E9AB1D]/10 text-[#E9AB1D]"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </motion.div>
            <h3 className="text-sm text-gray-600 mb-1 text-center">{stat.title}</h3>
            <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* الرسم البياني */}
      <motion.div
        className="bg-white border border-[#E9AB1D]/20 rounded-3xl p-6 shadow-[0_4px_20px_rgba(233,171,29,0.05)]"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
            <FaChartLine className="text-[#E9AB1D]" />
            إحصائيات الشحنات الشهرية
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E9AB1D" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#c98a00" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5ecd1" vertical={false} />
            <XAxis dataKey="month" stroke="#999" tick={{ fontSize: 13 }} />
            <YAxis stroke="#999" tick={{ fontSize: 13 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fffdf7",
                border: "1px solid #E9AB1D",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#c98a00", fontWeight: 600 }}
              itemStyle={{ color: "#1A1A1A" }}
              formatter={(value) => [`${value} شحنة`, "عدد الشحنات"]}
            />
            <Line
              type="monotone"
              dataKey="shipments"
              stroke="url(#colorLine)"
              strokeWidth={4}
              dot={{ r: 6, fill: "#fff", stroke: "#E9AB1D", strokeWidth: 3 }}
              activeDot={{
                r: 8,
                fill: "#E9AB1D",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              animationDuration={1800}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
