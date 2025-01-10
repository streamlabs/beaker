import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  base: "/beaker/",
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    }),
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

  resolve: {
    alias: {
      vue: '@vue/compat',
      'vue-js-modal': path.join(__dirname, './src/plugins/vue-js-modal/src')
    }
  }
});
