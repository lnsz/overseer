FROM node:12.3-alpine

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++

WORKDIR /app

COPY package.json yarn* ./
RUN yarn

COPY . .

USER node

CMD [ "yarn", "serve" ]