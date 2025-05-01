import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  return {
    server: {
      cors: {
        origin: 'http://api.odisharia.ru',
        methods: ['GET', 'PUT', 'POST'],
        allowHeaders: ['Access-Control-Allow-Origin', 'https://api.odisharia.ru']
      },
      host: 'odisharia.ru',
      https: true,
    },
    plugins: [
      tailwindcss(),
      sveltekit(),
      mkcert(),
    ],
    define: {
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
    },
    resolve: {
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.d.ts', '.svelte']
    },
    watch: {
      usePolling: true
    },
  }
})
