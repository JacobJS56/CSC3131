# pull the base image
FROM node:alpine

# Author
LABEL authors="Jacob Smith"

# set the working direction
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]