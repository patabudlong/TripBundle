#!/bin/bash
echo "💾 Creating backup..."

cd "$(dirname "$0")/.."

# Create backup directory
mkdir -p ./backups

# Database backup
echo "📊 Backing up database..."
docker exec tripbundles-postgres-prod pg_dump -U prod_user tripbundles_prod > ./backups/db_backup_$(date +%Y%m%d_%H%M%S).sql

# Redis backup
echo "🔴 Backing up Redis..."
docker exec tripbundles-redis-prod redis-cli --rdb /data/redis_backup_$(date +%Y%m%d_%H%M%S).rdb

# Compress old backups
echo "🗜️ Compressing old backups..."
find ./backups -name "*.sql" -mtime +7 -exec gzip {} \;

echo "✅ Backup completed!" 