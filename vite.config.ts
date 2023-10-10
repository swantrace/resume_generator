import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
