import React, { useState } from "react";
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

export default function Calculator() {
  const [usdPrice, setUsdPrice] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const exchangeRate = 6.8;

  const weights = {
    "احذية": 0.6,
    "اكسسوارات خفيفة": 0.03,
    "أكواب (رفق)": 0.25,
    "بيجامة قطعتين": 0.3,
    "تحف": 0.3,
    "تيشيرت": 0.2,
    "جاكيت": 0.8,
    "جوارب": 0.02,
    "خواتم وسلاسل وحدايد": 0.03,
    "سروال": 0.5,
    "سروال جينز": 0.6,
    "شنشب منزل": 0.2,
    "عباية": 0.6,
    "غطاء سرير": 0.8,
    "فستان": 0.3,
    "فستان سهرة خفيفة": 0.3,
    "فوانيس ديكورية": 0.5,
    "كريمات": 0.04,
    "ملابس أطفال": 0.3,
    "منشفة": 0.3,
    "ميزان": 1.0,
  };

  const handleAddItem = () => {
    if (!itemType || !itemCount) {
      setError("الرجاء اختيار الصنف وتحديد عدد القطع.");
      return;
    }

    const count = parseInt(itemCount);
    const weight = weights[itemType] * count;
    const newItem = { type: itemType, count, weight };
    setItems([...items, newItem]);
    setItemType("");
    setItemCount("");
    setError("");
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!usdPrice || items.length === 0) {
      setError("الرجاء إدخال سعر السلة وإضافة الأصناف.");
      return;
    }

    const usd = parseFloat(usdPrice);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const shippingCost = totalWeight * 12;
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
    <motion.div
      className="max-w-4xl mx-auto px-6 py-20 text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* العنوان */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-10 flex items-center justify-center gap-3"
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
          <FaCalculator className="text-[#E9AB1D] drop-shadow-md" />
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
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(233,171,29,0.4); }
            50% { box-shadow: 0 0 25px rgba(233,171,29,0.6); }
          }
        `}
      </style>

      {/* الصندوق */}
      <motion.div
        className="bg-white/90 shadow-lg rounded-3xl p-8 border border-[#E9AB1D]/30 backdrop-blur-sm text-right"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* سعر السلة */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
            <FaDollarSign className="text-[#E9AB1D] text-xl" />
            سعر السلة بالدولار (USD)
          </label>
          <input
            type="number"
            value={usdPrice}
            onChange={(e) => setUsdPrice(e.target.value)}
            placeholder="مثلاً: 250"
            className="w-full p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9AB1D] transition-all mb-6"
          />
        </div>

        {/* سعر الصرف */}
        <div>
          <label className="flex items-center gap-2 mb-2 font-semibold text-gray-800">
            <FaExchangeAlt className="text-[#E9AB1D] text-xl" />
            سعر الصرف الحالي
          </label>
          <input
            type="text"
            value={exchangeRate}
            readOnly
            className="w-full p-3 border border-gray-200 bg-gray-50 rounded-full text-gray-700 cursor-default mb-6 font-semibold"
          />
        </div>

        {/* اختيار الصنف */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9AB1D]"
          >
            <option value="">اختر الصنف...</option>
            {Object.keys(weights).map((key) => (
              <option key={key} value={key}>
                {key} ({weights[key]} كجم)
              </option>
            ))}
          </select>

          <input
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            placeholder="عدد القطع"
            className="w-full md:w-40 p-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E9AB1D]"
          />

          <button
            onClick={handleAddItem}
            className="bg-[#E9AB1D] hover:bg-[#d49616] text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-all duration-300"
          >
            <FaPlusCircle /> أضف الصنف
          </button>
        </div>

        {/* ملاحظة الوزن */}
        <p className="text-gray-600 text-sm mt-2 italic">
          ⚖️ جميع الأوزان تقريبية لأغراض تقدير التكلفة فقط.
        </p>

        {/* جدول الأصناف */}
        {items.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#fff9ef] text-[#E9AB1D]">
                  <th className="py-3 px-4">الصنف</th>
                  <th className="py-3 px-4">العدد</th>
                  <th className="py-3 px-4">الوزن الكلي (كجم)</th>
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
                    <td className="py-3 px-4">{item.weight.toFixed(2)}</td>
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
          className="w-full bg-[#E9AB1D] hover:bg-[#d49616] text-white font-semibold text-lg mt-8 py-3 rounded-full shadow-md transition-all duration-300"
        >
          احسب التكلفة الإجمالية
        </motion.button>

        {error && (
          <p className="text-red-600 mt-5 font-medium text-center">{error}</p>
        )}

        {/* النتائج */}
        {result && (
          <motion.div
            className="mt-10 grid gap-5 text-center"
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
                icon: <FaTruck style={{ transform: "scaleX(-1)" }} />, // ✅ عكس الاتجاه
                label: "تكلفة الشحن",
                value: `${result.shippingCost} LYD`,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gradient-to-r from-[#fff9ef] to-[#fff3d2] rounded-2xl shadow-sm border border-[#E9AB1D]/40 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="text-[#E9AB1D] text-3xl mb-3">{item.icon}</div>
                <p className="font-semibold text-gray-800">{item.label}</p>
                <p className="text-lg text-[#1A1A1A] font-bold">{item.value}</p>
              </motion.div>
            ))}

            {/* المجموع النهائي */}
            <motion.div
              className="p-6 bg-[#E9AB1D] text-white rounded-2xl shadow-md font-bold text-xl animate-[glow_3s_ease-in-out_infinite]"
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
            هذه التكاليف تقريبية وليست النهائية لفئات المنتجات. تم تقدير الأوزان بناءً على متوسط وزن كل فئة لتسهيل حساب التكلفة قبل وصول الطلبية. قد تختلف التكلفة الفعلية قليلاً (أقل أو أكثر) عن السعر المحسوب هنا.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
