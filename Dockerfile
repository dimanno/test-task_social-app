FROM node:14-alpine

MAINTAINER Dmytro

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm install --production

