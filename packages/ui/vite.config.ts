import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { UI_DEV_SERVER_PORT } from "@protostar/common/ports";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    // Make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      autoCodeSplitting: true,
      quoteStyle: "double",
      target: "react",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: UI_DEV_SERVER_PORT,
  },
});
