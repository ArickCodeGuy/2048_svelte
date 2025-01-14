import { resolve as pathResolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { BASE_PATH } from './src/constants/base';
import eslint from 'vite-plugin-eslint';

const resolve = (path: string) => pathResolve(__dirname, path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), eslint()],
  base: BASE_PATH,
  build: {
    rollupOptions: {
      // index for dev
      // 404 for gh-pages
      input: ['404.html', 'index.html'],
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
