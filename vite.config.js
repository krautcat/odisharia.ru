import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  return {
    server: {
      cors: {
        origin: 'http://api.odisharia.ru',
        methods: ['GET', 'PUT', 'POST'],
        allowHeaders: ['Access-Control-Allow-Origin', 'https://api.odisharia.ru']
      }
    },
    plugins: [sveltekit()],
    define: {
      'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"'
    },
    resolve: {
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.d.ts']
    },
    watch: {
      usePolling: true
    },
    plugins: [
      sveltekit(),
      mkcert(),
    ]
  }
})
