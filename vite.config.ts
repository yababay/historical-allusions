import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/edit': 'http://localhost:8080',
    }
  },
  plugins: [svelte(), , svgLoader({defaultImport: 'raw'})]
})

