FROM node:18-alpine

WORKDIR /var/www/odisharia.ru

COPY package*.json jsconfig.json svelte.config.js postcss.config.cjs tailwind.config.cjs vite.config.js ./

RUN npm install --save

COPY src ./src
COPY static ./static

RUN npm run build

EXPOSE 80
EXPOSE 443

ENV PORT=80

CMD [ "node", "build" ]
