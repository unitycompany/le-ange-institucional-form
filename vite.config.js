import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        "/assets/index-BHhcukG4.js"
      ],
    },
  },
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://unitycompany.app.n8n.cloud/webhook-test/2a010bee-ce10-4219-b3c5-1c252987f6e9',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, ''),
        secure: true
      }
    }
  }
});
