import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy API calls during development to backend (port 5000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
