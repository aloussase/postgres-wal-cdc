#!/bin/bash

docker compose up postgres broker -d
sleep 5

docker compose up cdc_topic_creator -d
sleep 5

docker compose up -d
