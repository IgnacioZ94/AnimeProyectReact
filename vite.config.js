import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5105', // Assuming standard .NET port, will confirm
        changeOrigin: true,
        secure: false
      }
    }
  }
})
