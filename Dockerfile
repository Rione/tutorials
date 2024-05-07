FROM node:current-alpine3.19

WORKDIR /app
RUN apk update

EXPOSE 8080