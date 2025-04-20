FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.js index.js

EXPOSE 8080

ENV KAFKA_TOPIC="cdc-changes"
ENV KAFKA_BROKER_ADDR="broker:29092"
ENV WS_SERVER_PORT="8080"

CMD [ "node", "index.js" ]
