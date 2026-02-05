import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
  optimizeDeps: {
    include: [
      'bpmn-js',
      'bpmn-js-properties-panel',
      //'camunda-bpmn-moddle'
    ]
  },
     assetsInclude: ['**/*.bpmn'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})