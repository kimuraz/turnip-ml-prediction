FROM node:12-alpine

RUN mkdir -p /opt/turnip-ml

WORKDIR /opt/turnip-ml

ADD . .

RUN yarn install

RUN yarn global add sequelize-cli

EXPOSE "3000:3000"
