import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

const localUrl = process.env.LOCAL_URL || "";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert({
      hosts: ["localhost", "127.0.0.1", localUrl],
    }),
  ],
  server: {
    host: "0.0.0.0",
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
