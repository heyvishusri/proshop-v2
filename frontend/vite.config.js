import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy API requests to backend
      "/api": {
        target: "http://localhost:8000", // Make sure backend runs on port 8000 (or update this)
        changeOrigin: true
      },
      // Proxy uploaded images to backend
      // This allows /uploads/image-xxx.jpg to work in development
      // In production, backend serves /uploads directly
      "/uploads": {
        target: "http://localhost:8000", // Make sure backend runs on port 8000 (or update this)
        changeOrigin: true
      }
    }
  }
});
