.PHONY: help build up down restart logs shell clean config

# Default target
help:
	@echo "Available commands:"
	@echo "  make config  - Show Docker configuration"
	@echo "  make build   - Build the Docker image"
	@echo "  make up      - Start the containers"
	@echo "  make down    - Stop the containers"
	@echo "  make restart - Restart the containers"
	@echo "  make logs    - Show container logs"
	@echo "  make shell   - Open shell in container"
	@echo "  make clean   - Remove containers and images"

# Show Docker configuration
config:
	@echo "=== Docker Configuration ==="
	@echo ""
	@echo "Docker version:"
	@docker --version || echo "Docker not installed"
	@echo ""
	@echo "Docker Compose version:"
	@docker compose version || echo "Docker Compose not installed"
	@echo ""
	@echo "=== Project Configuration ==="
	@echo ""
	@echo "Container name: savvy-tech-test"
	@echo "Port: 3000"
	@echo "Image: savvy-tech-test:latest"
	@echo ""
	@echo "=== Build Information ==="
	@echo "Next.js application will be built and served on port 3000"
	@echo "Use 'make build' to build the Docker image"
	@echo "Use 'make up' to start the container"

# Build the Docker image
build:
	@echo "Building Docker image..."
	docker compose build

# Start the containers
up:
	@echo "Starting containers..."
	docker compose up -d
	@echo ""
	@echo "Application is running at http://localhost:3000"

# Stop the containers
down:
	@echo "Stopping containers..."
	docker compose down

# Restart the containers
restart: down up

# Show container logs
logs:
	docker compose logs -f

# Open shell in container
shell:
	docker compose exec app sh

# Clean up containers and images
clean:
	@echo "Removing containers and images..."
	docker compose down -v --rmi all
	@echo "Cleanup complete"

