import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    cors: {
      origin: "http://api.odisharia.ru",
      methods: ["GET", "PUT", "POST"],
      allowHeaders: [
        "Access-Control-Allow-Origin", "https://api.odisharia.ru"
      ]
    },
  },
  plugins: [
    sveltekit(),
  ]
};

export default config;
