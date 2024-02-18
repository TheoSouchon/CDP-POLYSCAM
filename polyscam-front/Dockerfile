FROM node:20.5.0-alpine3.18 as build-front
COPY ./src ./src
COPY ./package*.json .
RUN npm i
RUN npm run build