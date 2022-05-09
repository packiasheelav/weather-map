import Map from './Map';
import React, { useState } from 'react';
import ErrorMessage from './components/ErrorMessage'
import FileUpload from './components/FileUpload';


const Main = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [message, setMessage] = useState({});

  const getWeatherData = data => {
    setWeatherData(data)
  }
  const printMessage = message => {
    setMessage(message)
  }

  return (
    <>
      <header id="pageHeader"><h2>WEATHER MAP</h2></header>
      <header id="pagefileheader">
        <div className="fileupload">
          <FileUpload getWeatherData={getWeatherData} printMessage={printMessage} />
          <ErrorMessage message={message} />
        </div>
      </header>
      <article id="mainArticle"><Map weatherData={weatherData} printMessage={printMessage} getWeatherData={getWeatherData}/></article>
    </>
  );
}
export default Main;
