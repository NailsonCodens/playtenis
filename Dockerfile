FROM node:16.17.0
ENV TZ="America/Sao_Paulo"
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV DEBUG=socket*

WORKDIR /usr/api_playtenis

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

