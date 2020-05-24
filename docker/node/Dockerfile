FROM node:12.14.0-alpine3.11

RUN mkdir -p  /var/www/node_modules && chown -R node:node  /var/www

WORKDIR  /var/www

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "start" ]