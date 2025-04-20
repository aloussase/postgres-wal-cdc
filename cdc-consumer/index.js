const { Kafka } = require('kafkajs');
const { WebSocketServer } = require('ws');

const topic = process.env.KAFKA_TOPIC || 'cdc-changes';
const brokerAddr = process.env.KAFKA_BROKER_ADDR || 'localhost:9092';
const serverPort = process.env.WS_SERVER_PORT || 8080;

const wss = new WebSocketServer({ port: serverPort });

const kafka = new Kafka({
  clientId: 'cdc-consumer',
  brokers: [brokerAddr]
})

const connections = new Set();

wss.on('connection', (ws) => {
  connections.add(ws);

  ws.on('close', () => {
    console.log('Client disconnected');
    connections.delete(ws);
  })

  ws.on('error', (err) => {
    console.log('WS error', err);
    connections.delete(ws);
  })
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
      if (connections.size === 0) {
        console.log('No clients connected');
        return;
      }

      const msg = message.value.toString()
      const json = JSON.parse(msg).change[0]

      try {
        const payload = {
          kind: json.kind,
          table: json.table,
          columns: json.columnnames,
          values: json.columnvalues,
        }

        console.log('Sending message to clients:', payload);

        for (const ws of connections) {
          ws.send(JSON.stringify(payload));
        }
      } catch (err) {
        console.log('Error while processing change message', err)
      }
    },
  })
})()
