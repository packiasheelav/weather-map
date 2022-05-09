
Start locally:

yarn start

Build locally:

yarn build


Running docker dev mode:

docker-compose -f docker-compose.dev.yml up

Running docker prod mode:

docker-compose -f docker-compose.prod.yml build

docker run -p 3001:3001 --name weather-map-backend-app  weather-map-backend-prod
