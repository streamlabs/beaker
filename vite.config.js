import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: '/beaker/',
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    minify: false,
    sourcemap: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vue-vendor',
              test: (id) => id.includes('/vue/') || id.includes('/vue-router/'),
            },
          ],
        },
      },
    },
  },
});
