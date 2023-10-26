import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "src/__tests__/e2e/**", "docs/**"],
    env: {
      NEXT_PUBLIC_API_SPECIFICATION_URL: "",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
