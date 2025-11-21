import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    runtimeErrorOverlay(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  }, 
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  }
  

})
