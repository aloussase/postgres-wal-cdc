import { KafkaConfig, KafkaConsumer } from "./kafka-consumer.js";
import { SocketServer } from "./socket-server.js";

const topic = process.env.KAFKA_TOPIC || "cdc-changes";
const brokerAddr = process.env.KAFKA_BROKER_ADDR || "localhost:9092";
const serverPort = process.env.WS_SERVER_PORT || 8080;

const socketServer = new SocketServer({ serverPort });
socketServer.start();

const kConfig = new KafkaConfig({
  topic,
  brokerAddr,
  onMessage: (message) => socketServer.sendMessage(message),
});

const kafkaConsumer = new KafkaConsumer(kConfig);
kafkaConsumer.start();
