# postgres wal cdc

Using the Postgres WAL as a CDC.

## Running

The setup is a mix of containers and local processes.

Kafka runs in a container, and the Postgres instance is local. You might tweak the setup
to run everything in containers.

### Setting up Postgres

After installing Postgres, the only pre-requisite is to enable the `wal2json` plugin.

I you are on Debian/Ubuntu, you can do this by running:

```bash
sudo apt-get install postgresql-17-wal2json
```

After installing the extension, you need to update your Postgres config to look like this:

```
wal_level = logical
max_replication_slots = 10
max_wal_senders = 10
```

`wal_level` needs to be set to `logical`. The other two can be set to 1 if you want.

Then, restart your Postgres server and you should be good to go.

### Start Kafka

```
docker compose up -d
```

### Start the CDC ingestor

There are some environment variables you might want to tweak. Take a look at the source code in `main.go` for that.

```
cd cdc-ingestor && go build && ./postgres-wal-cdc &
```

### Start the CDC consumer

```
cd cdc-consumer && npm install && npm run start
```

This will spin up a WebSocket server on port 8080 by default.

Again, look at the code in `index.js` to tweak environment variables.

## License
MIT
