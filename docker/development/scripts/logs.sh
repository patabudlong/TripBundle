#!/bin/bash
echo "📋 Showing Development Logs..."
cd "$(dirname "$0")/.."
docker-compose logs -f tripbundles-dev 