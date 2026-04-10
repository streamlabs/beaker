import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
    target: "es2020",
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL("./src/system.js", import.meta.url)),
      name: "Beaker",
      fileName: (format) => `beaker.${format}.js`,
    },
    rolldownOptions: {
      external: ["vue", "vue-router", "lodash-es", "vue-final-modal"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "lodash-es": "_",
          "vue-final-modal": "VueFinalModal",
        },
      },
    },
  },
});
