import { resolve } from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    minify: false,
    target: "es2020",
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/system.js"),
      name: "Beaker",
      fileName: (format) => `beaker.${format}.js`,
    },
    rolldownOptions: {
      external: ["vue", "vue-router", "lodash-es"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "lodash-es": "_",
        },
      },
    },
  },
});
