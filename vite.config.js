import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: ["site-width-react.onrender.com"],
  },
});
