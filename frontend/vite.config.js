import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from "node:path";
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr],
  optimizeDeps: {
    include: ['@emotion/styled']
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
