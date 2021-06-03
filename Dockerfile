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