import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/' for Vercel, '/quik-css_demo/' for GitHub Pages
  base: process.env.GITHUB_PAGES ? '/quik-css_demo/' : '/',
})
