FROM node:20.13.1-alpine

WORKDIR /var/mind-city-board

COPY package.json /var/mind-city-board

RUN npm install npm@latest

RUN npm install

COPY . /var/mind-city-board

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]