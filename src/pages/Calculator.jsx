// src/pages/Calculator.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaMoneyBillWave,
  FaTruck,
  FaWeightHanging,
  FaTrash,
  FaPlusCircle,
  FaInfoCircle,
  FaDollarSign,
  FaExchangeAlt,
} from "react-icons/fa";
import { apiRequest } from "../api/api"; // ✅ استخدام الدالة الموحدة
import FloatingOrderButton from "../components/FloatingOrderButton"; // ✅ زر الطلب الثابت
import guideImg from "../assets/shein-guide.png";


export default function Calculator() {
  const [usdPrice, setUsdPrice] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(6.8);
  const [shippingRate, setShippingRate] = useState(12);
  const [showNote, setShowNote] = useState(false);


  // 🔹 جلب البيانات من API (التصنيفات + سعر الصرف + سعر الشحن)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, rateRes, shippingRes] = await Promise.all([
          apiRequest("/categories"),
          apiRequest("/exchange-rate"),
          apiRequest("/shipping-rate"),
        ]);

        // ✅ التصنيفات
        const cats = Array.isArray(categoriesRes.data)
          ? categoriesRes.data
          : Array.isArray(categoriesRes)
          ? categoriesRes
          : [];
        setCategories(cats);

        // ✅ سعر الصرف
        const rate = rateRes?.data?.rate ?? rateRes?.rate ?? exchangeRate;
        setExchangeRate(rate);

        // ✅ سعر الشحن
        const shipping =
          shippingRes?.data?.rate_per_kg ??
          shippingRes?.rate_per_kg ??
          shippingRate;
        setShippingRate(shipping);
      } catch (err) {
        console.error("❌ فشل في جلب البيانات:", err);
        // fallback بدون API
        setCategories([
          { id: 1, name: "تيشيرت", approx_weight: 0.2 },
          { id: 2, name: "سروال", approx_weight: 0.5 },
          { id: 3, name: "أحذية", approx_weight: 0.6 },
        ]);
        setExchangeRate(6.8);
        setShippingRate(12);
      }
    };

    fetchData();
  }, []);

  // ➕ إضافة صنف
  const handleAddItem = () => {
    if (!itemType || !itemCount) {
      setError("الرجاء اختيار الصنف وتحديد عدد القطع.");
      return;
    }

    const selected = categories.find((cat) => cat.name === itemType);
    if (!selected) {
      setError("حدث خطأ أثناء اختيار الصنف.");
      return;
    }

    const count = parseInt(itemCount);
    const weight = selected.approx_weight * count;
    const newItem = { type: itemType, count, weight };
    setItems([...items, newItem]);
    setItemType("");
    setItemCount("");
    setError("");
  };

  // ❌ حذف صنف
  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 🧮 الحساب
  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!usdPrice || items.length === 0) {
      setError("الرجاء إدخال سعر السلة وإضافة الأصناف.");
      return;
    }

    const usd = parseFloat(usdPrice);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const shippingCost = totalWeight * shippingRate;
    const priceLYD = usd * exchangeRate;
    const total = priceLYD + shippingCost;

    setResult({
      priceLYD: priceLYD.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      totalWeight: totalWeight.toFixed(2),
      total: total.toFixed(2),
    });
  };

  return (
    <div className="relative">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 🟡 العنوان */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 flex flex-wrap items-center justify-center gap-2 text-[#1A1A1A]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "linear-gradient(90deg, #E9AB1D, #c98a00, #E9AB1D)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shine 6s linear infinite",
          }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaCalculator className="text-[#E9AB1D] drop-shadow-md text-3xl sm:text-4xl" />
          </motion.span>
          حاسبة الأسعار
        </motion.h1>

        <style>
          {`
            @keyframes shine {
              0% { background-position: 0% center; }
              50% { background-position: 100% center; }
              100% { background-position: 0% center; }
            }
          `}
        </style>

        {/* ⚪ الصندوق الرئيسي */}
        <motion.div
          className="bg-white/95 shadow-lg rounded-3xl p-6 sm:p-8 border border-[#E9AB1D]/30 backdrop-blur-sm text-right"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* سعر السلة */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800 text-sm sm:text-base">
  <FaDollarSign className="text-[#E9AB1D]" />
  سعر الطلبية بالدولار

  <button
    onClick={() => setShowNote(true)}
    className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm flex items-center gap-1 underline"
  >
    هام جداً
    <FaInfoCircle />
  </button>
</label>

            <input
              type="number"
              value={usdPrice}
              onChange={(e) => setUsdPrice(e.target.value)}
              placeholder="مثلاً: 250"
              className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9AB1D] transition-all mb-5 text-center"
            />
          </div>

          {/* سعر الصرف */}
          <div>
            <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800 text-sm sm:text-base">
              <FaExchangeAlt className="text-[#E9AB1D]" />
              سعر الصرف الحالي
            </label>
            <input
              type="text"
              value={exchangeRate}
              readOnly
              className="w-full p-3 border border-gray-200 bg-gray-50 rounded-full text-gray-700 cursor-default mb-5 font-semibold text-center"
            />
          </div>

          {/* اختيار الصنف */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
            <select
  value={itemType}
  onChange={(e) => setItemType(e.target.value)}
  className="
    w-full                /* يجعلها كبيرة في الموبايل */
    sm:flex-1             /* يرجعها كما كانت على الديسكتوب */
    p-3 
    border border-gray-200 
    rounded-full 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#E9AB1D] 
    text-sm
  "
>

              <option value="">اختر الصنف...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.approx_weight} كجم)
                </option>
              ))}
            </select>

            <input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              placeholder="عدد القطع"
              className="w-full sm:w-40 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9AB1D] text-center text-sm"
            />

            <button
              onClick={handleAddItem}
              className="bg-[#E9AB1D] hover:bg-[#d49616] text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 justify-center transition-all duration-300 w-full sm:w-auto text-sm font-medium"
            >
              <FaPlusCircle /> أضف الصنف
            </button>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm mt-2 italic text-center">
            ⚖️ جميع الأوزان تقريبية لأغراض تقدير التكلفة فقط.
          </p>

          {/* جدول الأصناف */}
          {items.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-center border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-[#fff9ef] text-[#E9AB1D]">
                    <th className="py-3 px-4">الصنف</th>
                    <th className="py-3 px-4">العدد</th>
                    <th className="py-3 px-4">الوزن الكلي</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-[#fffdfa] transition-all"
                    >
                      <td className="py-3 px-4">{item.type}</td>
                      <td className="py-3 px-4">{item.count}</td>
                      <td className="py-3 px-4">
                        {item.weight.toFixed(2)} كجم
                      </td>
                      <td className="py-3 px-4 text-red-500">
                        <button
                          onClick={() => handleDeleteItem(index)}
                          className="hover:text-red-700 transition"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* زر الحساب */}
          <motion.button
            onClick={handleCalculate}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-[#E9AB1D] hover:bg-[#d49616] text-white font-semibold text-lg mt-6 py-3.5 rounded-full shadow-lg transition-all duration-300"
          >
            احسب التكلفة الإجمالية
          </motion.button>

          {error && (
            <p className="text-red-600 mt-4 font-medium text-center">{error}</p>
          )}

          {/* النتائج */}
          {result && (
            <motion.div
              className="mt-10 grid sm:grid-cols-3 gap-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
            >
              {[
                {
                  icon: <FaMoneyBillWave />,
                  label: "سعر السلة بالدينار",
                  value: `${result.priceLYD} LYD`,
                },
                {
                  icon: <FaWeightHanging />,
                  label: "الوزن الكلي",
                  value: `${result.totalWeight} كجم`,
                },
                {
                  icon: (
                    <FaTruck style={{ transform: "scaleX(-1)" }} />
                  ),
                  label: "تكلفة الشحن",
                  value: `${result.shippingCost} LYD`,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-5 bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] rounded-2xl shadow-sm border border-[#E9AB1D]/40 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="text-[#E9AB1D] text-3xl mb-2">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.label}
                  </p>
                  <p className="text-[#1A1A1A] font-bold text-base sm:text-lg">
                    {item.value}
                  </p>
                </motion.div>
              ))}

              <motion.div
                className="p-6 bg-[#E9AB1D] text-white rounded-2xl shadow-md font-bold text-lg sm:text-xl animate-[glow_3s_ease-in-out_infinite] col-span-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                المجموع النهائي: {result.total} LYD
              </motion.div>
            </motion.div>
          )}

          {/* الملاحظة الختامية */}
          <div className="mt-10 bg-[#fff9ef] border border-[#E9AB1D]/40 rounded-2xl p-5 text-right text-[#1A1A1A] shadow-sm">
            <div className="flex items-center text-[#E9AB1D] font-semibold mb-2">
              <FaInfoCircle className="ml-2" />
              ملاحظة هامة حول تكاليف الشحن:
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              هذه التكاليف تقريبية وليست النهائية. تم تقدير الأوزان بناءً على
              متوسط وزن كل فئة لتسهيل الحساب المسبق. قد تختلف التكلفة الفعلية
              قليلاً (أقل أو أكثر) عن السعر المحسوب هنا.
            </p>
          </div>
        </motion.div>
{showNote && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full text-right relative animate-[fadeIn_0.25s_ease]">

      {/* زر الإغلاق */}
      <button
        onClick={() => setShowNote(false)}
        className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      {/* العنوان */}
      <h2 className="text-2xl font-bold mb-4 text-[#E9AB1D] flex items-center gap-2">
        <FaInfoCircle className="text-[#E9AB1D]" />
        تنبيه مهم قبل إدخال سعر السلة
      </h2>

      {/* الصورة */}
      <div className="w-full flex justify-center mb-4">
        <img
          src={guideImg}
          alt="كيفية حساب السعر"
          className="w-64 sm:w-72 rounded-xl shadow-md border border-[#E9AB1D]/30"
        />
      </div>

      {/* المحتوى */}
      <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
        <p>
          لضمان دقة الحساب، من المهم التأكد من أن إعدادات تطبيق <strong>SHEIN</strong>
          مضبوطة بشكل صحيح عند عرض سعر السلة.
        </p>

        <ul className="list-disc pr-5 space-y-1">
          <li>افتح إعدادات حسابك داخل التطبيق.</li>
          <li>غيّر الموقع إلى: <strong>United Arab Emirates</strong>.</li>
          <li>تأكد أن العملة المختارة هي: <strong>USD – الدولار الأمريكي</strong>.</li>
        </ul>

        <p>
          ملاحظة: في حال كنت مسجل دخول بحساب شخصي، قد تظهر أسعار مختلفة بسبب عروض مرتبطة بالحساب، لذلك يفضّل تسجيل الخروج قبل عملية الحساب.
        </p>
      </div>

      {/* زر الإغلاق */}
      <button
        onClick={() => setShowNote(false)}
        className="w-full mt-6 bg-[#E9AB1D] hover:bg-[#d49616] text-white py-3 rounded-full font-semibold transition"
      >
        فهمت
      </button>
    </div>
  </div>
)}


      </motion.div>

      {/* ✅ زر الطلب الثابت */}
      <FloatingOrderButton />
    </div>
  );
}
