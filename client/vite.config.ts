import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5137, // Vite frontend will run on localhost:3000
    open: true, // Auto-open browser on server start
    proxy: {
      '/api': {
        // target: 'http://localhost:5000', // Proxy API requests to Express backend
        target: 'http://server:5000',  // <-- Use Docker service name here
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
