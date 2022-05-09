import React from "react";

const WeatherOptionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeTemperatureUnit(i)}
          checked={option.property === props.property}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div className="toggle-group relative top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 ">
      {props.options.map(renderOptions)}
    </div>
  );
};

export default WeatherOptionsfield;
