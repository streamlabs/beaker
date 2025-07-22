import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/")
    }
  },
  plugins: [vueDevTools(), vue()],
  build: {
    minify: false
  }
});
