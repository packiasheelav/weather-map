
## Project use case
Its weather map application.The map shows the temperature of the location according to the uploded json data.
- The user opens the website shows the blank map.
- The user uploads a data json file and a map is shown with locations,temperature according to the data
- The user is able to switch from deg C to  Deg F and the temperatures are shown in the chosen unit.

## Modules
It has two modules. They are weather-map-frontend and weather-map-backend modules.

**weather-map-frontend**
Its front end UI module.The user intrect this layer. Its developed using react.
Technology:
- mapbox-gl
- react
- webpack
- Docker

**weather-map-backend**
Its backend RestAPI module.The frontend intrect this layer. Its developed using js.
Technology:
- js
- Nodejs
- express
- esbuild
- Docker

## How to run the application

Clone this repo locally

### directory layout
    .
    ├── weather-map                 # parent folder
    │   ├── weather-map-frontend    # frontend module
    │   ├── weather-map-backend     # backend module
    │   ├── testdata                # test json weather data
    └── ...

**Configuration**:

weather-map-frontend/.env file has the configurations. Map access token configuuration should be configured,if its not configured already. The backend url also configured in the file.


**weather-map-frontend**:


```
..weather-map/weather-map-frontend/yarn install
..weather-map/weather-map-frontend/yarn start
```

You can view a website over at  http://localhost:8080/ . It runs on port 8080.

#### Running on Docker:

Docker should be exist and running in your system.
```
..weather-map/weather-map-frontend/docker build -t weather-map-frontend-img .
..weather-map/weather-map-frontend/docker images
..weather-map/weather-map-frontend/docker run -d -p 80:80 --name weather-map-frontend-prd weather-map-frontend-img 
```
You can view a website over at  http://localhost. It runs on port 80.

**weather-map-backendend**:

```
..weather-map/weather-map-backend/yarn install
..weather-map/weather-map-backend/yarn start
```

Frontend/client can reach RestAPI over at  http://localhost:3001/ . It runs on port 3001.

#### Running on Docker:

Docker should be exist and running in your system.
```
..weather-map/weather-map-backend/yarn build
..weather-map/weather-map-backend/docker build -t weather-map-backend-img .
..weather-map/weather-map-backend/docker images
..weather-map/weather-map-backend/docker run -d -p 3001:3001 --name weather-map-backend-prd weather-map-backend-img 
```

Frontend/client can reach Backend RestAPI over at  http://localhost:3001/ . It runs on port 3001.

#### Using the weather-map application :

- Make it sure frontend and backend are running.
- open the website in browser http://host:port
- The browser shows the map.
- Upload the test data file from the weather-map/testdata/weather.json.It shuold be json file."temp" value should be deg C
- The map shows the markers

#### Sample data format :
```
[{
  city: 'Rabat',
  lng: '-6.764401276167348',
  lat: '34.08673847983715',
  temp: '42'
},{
  city: 'Tokyo',
  lng: '139.74402667107728',
  lat: '35.73760407000897',
  temp: '15'
}]
```