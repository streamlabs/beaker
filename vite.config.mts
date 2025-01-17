import { defineConfig } from "vite";
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  // base: "/beaker/",
  resolve: {
    alias: {
      vue: '@vue/compat',
      '@': path.join(__dirname, 'src/'),
      'vue-js-modal': path.join(__dirname, 'src/plugins/vue-js-modal/src/index.js')
    }
  },
  plugins: [
    vueDevTools(),
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3
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
});
