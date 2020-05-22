# turnip-ml-prediction

> This is an experiment to predict turnip prices from Animal Crossing New Horizons

## Build Setup

```bash
# copy environment file
$ cp .env.example .env

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Using docker (and docker-compose)

```
$ cp .env.example .env

$ docker-compose up

$ docker-compose exec web sh

$ cd server

$ ./setup-db.sh
```
