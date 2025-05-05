import { KafkaConfig, KafkaConsumer } from "./kafka-consumer.js";
import { SocketServer } from "./socket-server.js";
import { PgClient } from "./pgClient.js";
import { createEndpoints } from "./endpoints.js";
import express from "express";
import cors from "cors";
import { createServer } from "http";

const topic = process.env.KAFKA_TOPIC || "cdc-changes";
const brokerAddr = process.env.KAFKA_BROKER_ADDR || "localhost:9092";
const serverPort = process.env.WS_SERVER_PORT || 8080;
const dbUser = process.env.DB_USER || "postgres";
const dbHost = process.env.DB_HOST || "postgres";
const dbDatabase = process.env.DB_DATABASE || "postgres";

const pgClient = new PgClient({
  user: dbUser,
  host: dbHost,
  database: dbDatabase,
});

const endpoints = createEndpoints(pgClient);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", endpoints.listTodos);
app.post("/todos/:id/toggle", endpoints.toggleTodo);
app.delete("/todos/:id", endpoints.deleteTodo);
app.patch("/todos/:id", endpoints.updateTodo);
app.post("/todos", endpoints.addTodo);

const server = createServer(app);

const socketServer = new SocketServer({ server });
socketServer.start();

const kConfig = new KafkaConfig({
  topic,
  brokerAddr,
  onMessage: (message) => socketServer.sendMessage(message),
});

const kafkaConsumer = new KafkaConsumer(kConfig);
kafkaConsumer.start();

pgClient.start().then(() => server.listen(serverPort));
