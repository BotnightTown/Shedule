import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',       // ← дозволяє доступ з інших пристроїв у мережі
    port: 5173             // ← або будь-який інший порт, який тобі підходить
  }
})
