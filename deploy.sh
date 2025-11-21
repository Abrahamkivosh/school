git pull
# Build the image
docker-compose build

# Run the container
docker-compose up -d

# Check logs
docker-compose logs -f