import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    minify: false,
    target: "chrome61",
    commonjsOptions: {
      requireReturnsDefault: true,
    },
    lib: {
      entry: resolve(__dirname, "src/system.js"),
      name: "Beaker",
      fileName: (format) => `beaker.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
