# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

# Author
LABEL authors="Jacob Smith"

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]