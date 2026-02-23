import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // Keep the React Compiler here, as it IS a Babel plugin
        plugins: ['babel-plugin-react-compiler'], 
      },
    }),
    // Move Tailwind here, as it IS a Vite plugin
    tailwindcss(), 
  ],
})