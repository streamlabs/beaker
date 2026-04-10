import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/beaker/",
  plugins: [vue()],
  build: {
    minify: false,
    sourcemap: true,
  },
});
