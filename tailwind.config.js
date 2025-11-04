/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E9AB1D", // الأصفر من الشعار
        dark: "#2C2C2C",    // الرمادي الغامق
      },
      fontFamily: {
        tajawal: ["Tajawal", "sans-serif"], // الخط الرئيسي
      },
    },
  },
  plugins: [],
};
