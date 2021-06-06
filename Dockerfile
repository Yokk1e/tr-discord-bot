# stage: 1 — build-node
FROM node:lts-alpine as build-node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

RUN npm install yarn

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY scraping.js ./
COPY main.js ./
COPY db.js ./

# stage: 2 — serve node
FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=build-node /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build-node /usr/src/app/scraping.js /usr/src/app/scraping.js
COPY --from=build-node /usr/src/app/main.js /usr/src/app/main.js
COPY --from=build-node /usr/src/app/db.js /usr/src/app/db.js

EXPOSE 3000
ENTRYPOINT ["node", "main.js"]
