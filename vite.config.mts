import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  base: "/beaker/",
  plugins: [
    vue(),
    dts({
      tsconfigPath: "tsconfig.build.json",
      cleanVueFileName: true,
      exclude: [
        "src/assets/**",
        "src/demos/**",
        "src/styles/**",
        "src/views/**",
      ],
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
    commonjsOptions: {
      requireReturnsDefault: true,
    },
  },
});
