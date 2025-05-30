#!/bin/bash
echo "📊 TripBundles Production Monitoring..."

cd "$(dirname "$0")/.."

echo "🐳 Docker containers status:"
docker-compose ps

echo ""
echo "💾 Disk usage:"
df -h

echo ""
echo "🧠 Memory usage:"
free -h

echo ""
echo "📈 Application logs (last 50 lines):"
docker-compose logs --tail=50 tripbundles-app 