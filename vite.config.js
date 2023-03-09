import { sveltekit } from '@sveltejs/kit/vite';

const viteServerConfig = {
    name: 'log-request-middleware',
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            res.setHeader("access-control-allow-origin", "http://api.odisharia.ru");
            res.setHeader("Access-Control-Allow-Methods", "GET");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            next();
        });
    }
};

/** @type {import('vite').UserConfig} */
const config = {
  server: {
    cors: {
      origin: "http://api.odisharia.ru",
      methods: ["GET", "PUT", "POST"],
      allowHeaders: [
        "Access-Control-Allow-Origin", "http://api.odisharia.ru"
      ]
    },
    headers: {
      "Access-Control-Allow-Origin": "http://api.odisharia.ru"
    }
  },
	plugins: [
    sveltekit(),
    viteServerConfig
  ]
};

export default config;
