import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    commonjsOptions: {
      requireReturnsDefault: true,
    },
    lib: {
      entry: resolve(__dirname, 'src/system.js'),
      name: 'Beaker',
      fileName: (format) => `beaker.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})