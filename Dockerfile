FROM node:18-alpine

WORKDIR /var/www/odisharia.ru

COPY package.json package-lock.json jsconfig.json svelte.config.js postcss.config.cjs tailwind.config.cjs vite.config.js ./

EXPOSE 80
EXPOSE 443

EXPOSE 4173
EXPOSE 5173

ENV PORT=80

RUN ["npm", "install", "--save"]

CMD ["/bin/sh"]
