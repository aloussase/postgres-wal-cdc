import { Kafka } from "kafkajs";

export class KafkaConfig {
  constructor({ brokerAddr, onMessage, topic }) {
    this.brokerAddr = brokerAddr;
    this.onMessage = onMessage;
    this.topic = topic;
  }
}

export class KafkaConsumer {
  #kafka;
  #config;
  #consumer;

  constructor(config) {
    this.#config = config;

    this.#kafka = new Kafka({
      clientId: "cdc-consumer",
      brokers: [this.#config.brokerAddr],
    });

    this.#consumer = this.#kafka.consumer({
      groupId: "cdc-group-1",
      allowAutoTopicCreation: true,
    });
  }

  async start() {
    await this.#consumer.connect();

    await this.#consumer.subscribe({
      topic: this.#config.topic,
      fromBeginning: true,
    });

    await this.#consumer.run({
      eachMessage: async ({ message }) => {
        const msg = message.value.toString();
        const json = JSON.parse(msg).change[0];

        try {
          const payload = {
            kind: json.kind,
            table: json.table,
            columns: json.columnnames,
            values: json.columnvalues,
          };

          console.log("Sending message to clients:", payload);

          this.#config.onMessage(payload);
        } catch (err) {
          console.log("Error while processing change message", err);
        }
      },
    });
  }
}
