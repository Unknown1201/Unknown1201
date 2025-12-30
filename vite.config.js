import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT:
  // If deploying to https://Unknown1201.github.io/devraj-portfolio/ use '/devraj-portfolio/'
  // If deploying to https://Unknown1201.github.io/ (root) use '/'
  base: '/devraj-portfolio/', 
})