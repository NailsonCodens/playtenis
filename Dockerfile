FROM node:16.17.0

WORKDIR /usr/api_playtenis

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3333

