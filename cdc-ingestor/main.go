package main

import (
	"bufio"
	"encoding/json"
	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"io"
	"log"
	"os"
	"os/exec"
)

type Changes struct {
	Change []Change `json:"change"`
}

type Change struct {
	Kind         string        `json:"kind"`
	Table        string        `json:"table"`
	ColumnNames  []string      `json:"columnnames"`
	ColumnTypes  []string      `json:"columntypes"`
	ColumnValues []interface{} `json:"columnvalues"`
}

var (
	pgHostName string = "localhost"
	pgUserName string = "postgres"
)

func createPgSlot(slot string) {
	cmd := exec.Command("pg_recvlogical", "-w", "-h", pgHostName, "-U", pgUserName, "-d", "postgres", "--slot", slot, "--create-slot", "-P", "wal2json")
	log.Println("Creating slot with command: ", cmd.String())

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	if err := cmd.Start(); err != nil {
		log.Fatal("Failed to start command:", err)
	}

	if err := cmd.Wait(); err != nil {
		log.Println("Failed to wait for command:", err)
	}
}

func startPgRecv(slot string) io.ReadCloser {
	cmd := exec.Command("pg_recvlogical", "-w", "-h", pgHostName, "-U", pgUserName, "-d", "postgres", "-n", "--slot", slot, "--start", "-f", "-")
	log.Println("Starting logical replication with command:", cmd.String())

	out, err := cmd.StdoutPipe()
	if err != nil {
		log.Fatal("Failed to get stdout pipe:", err)
	}

	cmd.Start()
	return out
}

var (
	slot = "test_slot"
)

func main() {
	pgHostName = os.Getenv("POSTGRES_HOST")
	log.Println("Postgres host: ", pgHostName)

	pgUserName = os.Getenv("POSTGRES_USER")
	log.Println("Postgres user: ", pgUserName)

	createPgSlot(slot)

	out := startPgRecv(slot)
	defer out.Close()

	brokerAddr := os.Getenv("KAFKA_BROKER_ADDR")
	if brokerAddr == "" {
		brokerAddr = "localhost:9092"
	}

	topic := os.Getenv("KAFKA_TOPIC")
	if topic == "" {
		topic = "cdc-changes"
	}

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": brokerAddr})
	if err != nil {
		panic(err)
	}
	defer p.Close()

	reader := bufio.NewReader(out)
	for {
		change, _, err := reader.ReadLine()
		if err != nil {
			log.Fatal("failed to read output from command: ", err)
		}

		var changes Changes
		if err := json.Unmarshal(change, &changes); err != nil {
			log.Fatal("failed to unmarshal event: ", err)
		}

		log.Println("Received changes: ", changes)

		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          change,
		}, nil)
	}
}
