FROM node:21-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/dist .

RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "tcp://0.0.0.0:3000"]
