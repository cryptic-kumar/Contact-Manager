// frontend/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- Add this server configuration ---
  server: {
    proxy: {
      // String shorthand for simple proxy
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
});
