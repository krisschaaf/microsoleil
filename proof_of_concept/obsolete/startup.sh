#!/bin/bash
set -e

echo "Creating network: supabase_network..."
docker network create supabase_network 2>/dev/null || true

echo "Starting Supabase services and waiting to stabilize..."
docker compose -f supabase-service/docker-compose.yml up -d --build --wait --timeout 300

echo "Starting PowerSync service and waiting to stabilize..."
docker compose -f powersync-service/docker-compose.yaml up -d --build --wait --timeout 300

echo "All services started successfully."
docker ps