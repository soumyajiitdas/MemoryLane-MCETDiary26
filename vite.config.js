import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Never inline images as base64 — always serve them as separate cacheable files
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Split vendor libs so the main app bundle stays small and loads fast
        manualChunks: {
          'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor':  ['framer-motion'],
          'icons-vendor':   ['lucide-react', 'react-icons'],
        },
      },
    },
  },
})

