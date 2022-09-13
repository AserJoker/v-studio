import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@widgets": path.resolve(__dirname, "src/widgets"),
      "@core": path.resolve(__dirname, "src/core"),
      "@pages": path.resolve(__dirname, "src/pages")
    }
  }
});
