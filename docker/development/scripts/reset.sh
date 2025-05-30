#!/bin/bash
echo "🔄 Resetting Development Environment..."
cd "$(dirname "$0")/.."
docker-compose down -v
docker-compose up --build 