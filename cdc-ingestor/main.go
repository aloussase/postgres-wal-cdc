package main

import (
	"bufio"
	"fmt"
	// "github.com/confluentinc/confluent-kafka-go/v2/kafka"
	"encoding/json"
	"io"
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

func createPgSlot(username string, slot string) {
	cmd := exec.Command("pg_recvlogical", "-U", username, "-d", "postgres", "--slot", slot, "--create-slot", "-P", "wal2json")
	if err := cmd.Run(); err != nil {
		fmt.Println("Could not creating slot, does it already exist?", err)
	}
}

func startPgRecv(slot string) io.ReadCloser {
	cmd := exec.Command("pg_recvlogical", "-d", "postgres", "-n", "--slot", slot, "--start", "-f", "-")

	out, err := cmd.StdoutPipe()
	if err != nil {
		fmt.Println("Failed to get stdout pipe:", err)
		os.Exit(1)
	}

	cmd.Start()
	return out
}

const (
	username = "aloussase"
	slot     = "test_slot"
)

func main() {
	createPgSlot(username, slot)

	out := startPgRecv(slot)
	defer out.Close()

	// p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost"})
	// if err != nil {
	// 	panic(err)
	// }
	// defer p.Close()

	reader := bufio.NewReader(out)
	for {
		change, _, err := reader.ReadLine()
		if err != nil {
			fmt.Println("failed to read output from command: ", err)
			os.Exit(1)
		}
		var changes Changes
		if err := json.Unmarshal(change, &changes); err != nil {
			fmt.Println("failed to unmarshal event: ", err)
			os.Exit(1)
		}
		fmt.Println(changes)
	}

	// Produce messages to topic (asynchronously)
	// topic := "myTopic"
	// for _, word := range []string{"Welcome", "to", "the", "Confluent", "Kafka", "Golang", "client"} {
	// 	p.Produce(&kafka.Message{
	// 		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
	// 		Value:          []byte(word),
	// 	}, nil)
	// }

	// // Wait for message deliveries before shutting down
	// p.Flush(15 * 1000)
}
