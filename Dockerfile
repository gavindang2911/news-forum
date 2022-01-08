FROM node

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install


COPY . .

RUN npm run build

ENV NODE_ENV=production

USER node

CMD [ "node", "dist/index.js" ]