import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'
import { resolve } from 'node:path'
import vitePluginSvgr from 'vite-plugin-svgr'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), vitePluginSvgr],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  server: {
    host: true,
    strictPort: true,
    historyApiFallback: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})
