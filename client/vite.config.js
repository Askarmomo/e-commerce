import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      "/api": "https://e-commerce-ndnl-aftdsfhxk-askars-projects-111a8034.vercel.app/",
    }
  },
  plugins: [
    react(),
  ],
})
