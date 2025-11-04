import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// تحميل متغيرات البيئة مرة واحدة فقط
dotenv.config()


// إعداد Vite
export default defineConfig({
  plugins: [react()],
  define: {
    __API_BASE__: JSON.stringify(process.env.VITE_API_BASE),
  },
})
