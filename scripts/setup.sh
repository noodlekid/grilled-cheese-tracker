#!/bin/bash
set -e

echo "🧀 Setting up Grilled Cheese Tracker..."

# Create necessary directories
mkdir -p backend/{api,pathfinding,discord-bot}/src
mkdir -p frontend/src/{components,pages,hooks,services,store,types,styles,utils}
mkdir -p docker scripts docs

# Copy environment variables
cp .env.example .env

# Setup database
echo "Setting up PostgreSQL database..."
createdb grilled_cheese_db || echo "Database already exists"
psql -d grilled_cheese_db < backend/migrations/001_initial_schema.sql
