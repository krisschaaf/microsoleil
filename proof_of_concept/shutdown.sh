#!/bin/bash
set -e

echo "--- Starting Service Cleanup ---"

echo "Stopping and removing PowerSync services defined in powersync-service/docker-compose.yaml..."
docker compose -f powersync-service/docker-compose.yaml down

echo "Stopping and removing Supabase services defined in supabase-service/docker-compose.yaml..."
docker compose -f supabase-service/docker-compose.yml down

echo "Removing shared network: supabase_network..."
docker network rm supabase_network 2>/dev/null || true

echo "--- Cleanup Complete ---"
echo "All containers, volumes, and the shared network have been removed."
docker ps