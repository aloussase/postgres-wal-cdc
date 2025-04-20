const { Kafka } = require('kafkajs');

const topic = process.env.KAFKA_TOPIC || 'cdc-changes';

const brokerAddr = process.env.KAFKA_BROKER_ADDR || 'localhost:9092';

const kafka = new Kafka({
  clientId: 'cdc-consumer',
  brokers: [brokerAddr]
})


const consumer = kafka.consumer({
  groupId: 'cdc-group-1'
});

(async function() {
  await consumer.connect()

  await consumer.subscribe({
    topic: topic,
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const msg = message.value.toString()
      const json = JSON.parse(msg).change[0]
      const payload = {
        kind: json.kind,
        table: json.table,
        columns: json.columnnames,
        values: json.columnvalues,
      }

      // TODO: Send over WebSocket
    },
  })
})()
