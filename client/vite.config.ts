import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal declaration so we can read PORT without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> };

// The frontend talks to the Express backend on port 3001. During development
// Vite proxies any /api request there so the client can use same-origin URLs.
export default defineConfig({
  plugins: [react()],
  server: {
    // Honor the PORT env var (used by the preview tooling for auto-assigned
    // ports); fall back to 5173 for a plain `npm run dev`.
    port: Number(process.env.PORT) || 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
