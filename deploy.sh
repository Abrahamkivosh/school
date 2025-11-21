git pull
# Build the image
docker compose -f docker-compose.yml build


# Run the container
docker compose -f docker-compose.yml up -d

# Check logs
docker compose -f docker-compose.yml logs -f