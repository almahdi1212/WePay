import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import viteCompression from 'vite-plugin-compression'

// تحميل env
dotenv.config()

export default defineConfig({
  plugins: [
    react(),

    // 🟡 ضغط Gzip
    viteCompression({
      verbose: true,
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // يبدأ الضغط للملفات أكبر من 1KB
    }),

    // 🟢 ضغط Brotli (الأفضل)
    viteCompression({
      verbose: true,
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],

  define: {
    __API_BASE__: JSON.stringify(process.env.VITE_API_BASE),
  },
})
