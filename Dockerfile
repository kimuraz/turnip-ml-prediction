FROM node:12-alpine

RUN mkdir -p /opt/turnip-ml

WORKDIR /opt/turnip-ml

ADD . .

RUN yarn install

EXPOSE "3000:3000"
