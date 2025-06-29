FROM node:22-alpine3.22

WORKDIR /var/www/odisharia.ru

COPY package.json package-lock.json jsconfig.json svelte.config.js \
    postcss.config.cjs tailwind.config.cjs vite.config.js tsconfig.json \
    vite.config.js ./
COPY src ./src
COPY static ./static

EXPOSE 4173
EXPOSE 5173

ENV PORT=5173
ENV HOST=172.20.0.11

RUN ["npm", "install", "--save"]
RUN ["npm", "run", "build"]

CMD ["node", "build"]
