# postgres wal cdc

Using the Postgres WAL as a CDC.

## Running

All services can be deployed using docker compose.

Due to certain dependencies among them, the recommended order to run them is:

```bash
# Start postgres and Kafka
docker compose up -d postgres broker

# Start the thingy that creates the topics
docker compose up -d cdc_topic_creator

# Start the other services
docker compose up -d
```

Once that's done, you should have the following:

- WebSocket server running on port 8080
- Web application running on port 3001
- Kafka and Postgres running on their standard ports

## License
MIT
