#!/bin/bash
echo "🚀 Starting TripBundles Development Environment..."
cd "$(dirname "$0")/.."
docker-compose up --build 