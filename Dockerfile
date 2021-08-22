FROM node:16-alpine3.11

WORKDIR /app
COPY package.json .

RUN npm install yarn

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
  then yarn; \
  else yarn --production; \
  fi

COPY . ./

ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]
