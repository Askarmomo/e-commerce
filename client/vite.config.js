import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      "/api": "https://e-commerce-1-backend-4s5l.onrender.com",
    }
  },
  plugins: [
    react(),
  ],
})
