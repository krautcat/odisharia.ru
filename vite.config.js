import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from'vite-plugin-mkcert';

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    https: true,
    port: 5173,
    cors: {
      origin: "https://api.odisharia.ru:8080",
      methods: ["GET", "PUT", "POST"],
      allowHeaders: [
        "Access-Control-Allow-Origin", "https://api.odisharia.ru:8080"
      ]
    },
  },
  watch: {
    usePolling: true
  },
  plugins: [
    sveltekit(),
    mkcert(),
  ]
};

export default config;
