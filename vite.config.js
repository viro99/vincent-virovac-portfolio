import { defineConfig } from 'vite'

export default defineConfig({
  base: '/vincent-virovac-portfolio/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  }
})