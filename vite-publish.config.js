import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      processor: 'vue',
      tsconfigPath: './tsconfig.json',
      cleanVueFileName: true,
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: './src/system.ts',
      name: 'Beaker',
      formats: ['es'],
      fileName: () => 'beaker.es.js',
      cssFileName: 'style',
    },
    rolldownOptions: {
      external: ['vue', 'vue-router', 'lodash-es', 'vue-final-modal'],
    },
  },
});
