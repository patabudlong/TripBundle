#!/bin/bash
echo "🚀 Deploying TripBundles to Production..."

cd "$(dirname "$0")/.."

# Create backup before deployment
./scripts/backup.sh

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose down
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 60

# Health check
echo "🏥 Performing health check..."
if curl -f https://tripbundles.com/api/health; then
    echo "✅ Deployment completed successfully!"
else
    echo "❌ Health check failed!"
    exit 1
fi

# Show running containers
docker-compose ps 