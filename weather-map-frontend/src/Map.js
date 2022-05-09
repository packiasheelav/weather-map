import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import WeatherOptionsfield from './components/WeatherOptionsfield';
import * as httpService from './service/HttpService';
import {ERROR_CODE} from './util/ErrorCode'
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {

  const options = [
    {
      name: 'celsius',
      description: 'Temperature in celsius',
      property: 'c'
    },
    {
      name: 'Fahrenheit',
      description: 'Temperature in Fahrenheit',
      property: 'f'

    }
  ];

  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);
  const [showRadio, setShowRadio] = useState(false);

  const changeTemperatureUnit = async (i) => {
    setActive(options[i]);
    props.printMessage({ "message": "Loading data..", "messageClassName": ERROR_CODE.UPLOADING })
    try {
      const { response, data } = await httpService.getData(active.property)
      if (response.status === 200) {
        props.getWeatherData(data)
      }
      props.printMessage({"message": "Data received", "messageClassName": ERROR_CODE.SUCCESS})
    } catch (error) {
      props.printMessage({ "message": "Data fetch error occured", "messageClassName": ERROR_CODE.ERROR })
    }
  }


  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [24, 60],
      zoom: 1
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      map.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
          ]
        }
      ]);
      setMap(map);
    });

    map.on('click', function (e) {
      console.log(e.lngLat);
    });

    if (props.weatherData.length > 0) setShowRadio(true)
    else setShowRadio(false)

    props.weatherData.forEach(marker => {

      if (!marker.temp) return;

      let backgroundColor = '#EA4335'
      let temperature = marker.temp + ' ' + active.property.toUpperCase()//default celsius

      if (active.property === 'f') {//ctof
        backgroundColor = '#0099cc'
      }

      if (marker.lng && marker.lat && isLat(marker.lat) && isLng(marker.lng)) {
        const el = document.createElement('div');
        el.innerHTML = `
            <span style="height: 40px;
            width: 40px;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            border-radius: 50%;
            background:${backgroundColor};
            color:black
            ">
            ${temperature}
            </span>
          `;
        new mapboxgl.Marker(el).setLngLat([marker.lng, marker.lat])
          .setPopup(new mapboxgl.Popup({ offset: 20 })
            .setHTML('<div>' +
              '<span> City: ' + (marker.city ? marker.city : '') + '</span> <p>' +
              '<span> Lat: ' + marker.lat + '</span> <p>' +
              '<span> Lng: ' + marker.lng + '</span><p>' +
              '<span> Temperature: ' + temperature + '</span>' +
              '</div>').setMaxWidth("300px"))
          .addTo(map);
      }
    })

    return () => map.remove();
  }, [props.weatherData]);

  const isLat = (lat) => {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }

  const isLng = (lng) => {
    return isFinite(lng) && Math.abs(lng) <= 180;
  }

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
      {showRadio ? (<WeatherOptionsfield
        options={options}
        property={active.property}
        changeTemperatureUnit={changeTemperatureUnit}
      />) : ''}
    </div>
  );
};

export default Map;
