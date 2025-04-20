FROM golang:1.23-bullseye

RUN apt-get update && apt-get install postgresql -y
RUN pg_recvlogical -V

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY main.go ./
RUN go build -o main

ENTRYPOINT ["/app/main"]
