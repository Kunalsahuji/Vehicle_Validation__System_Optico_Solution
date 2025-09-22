// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // This replaces PostCSS setup
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173, // Frontend runs on 5173 (Vite default), Backend on 3000
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend port
        changeOrigin: true,
      }
    }
  }
})