# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 5000

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]