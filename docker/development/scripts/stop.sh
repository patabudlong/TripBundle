#!/bin/bash
echo "🛑 Stopping TripBundles Development Environment..."
cd "$(dirname "$0")/.."
docker-compose down 