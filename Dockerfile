FROM node:16-alpine3.11

WORKDIR /app
COPY package.json .

RUN npm install yarn

RUN yarn

COPY . ./

ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]
