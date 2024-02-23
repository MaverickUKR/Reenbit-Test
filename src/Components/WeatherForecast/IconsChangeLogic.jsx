import React from "react";

const IconsChangeLogic = ({ iconCode }) => {
  const iconMappings = {
    "clear-day": "clear.png",
    cloudy: "cloudy.png",
    rain: "rain.png",
    fog: "fog.png",
    hail: "hail.png",
    sleet: "sleet.png",
    snow: "snow.png",
    wind: "wind.png",
    thunder: "thunder.png",
    "clear-night": "clear-night.png",
    "partly-cloudy-day": "partly-cloudy-day.png",
    "partly-cloudy-night": "partly-cloudy-night.png",
    "rain-snow-showers-day": "rain-snow-showers-day.png",
    "rain-snow-showers-night": "rain-snow-showers-night.png",
    "rain-snow": "rain-snow.png",
    "showers-day": "showers-day.png",
    "showers-night": "showers-night.png",
    "snow-showers-day": "snow-showers-day.png",
    "snow-showers-night": "snow-showers-night.png",
    "thunder-rain": "thunder-rain.png",
    "thunder-showers-day": "thunder-showers-day.png",
    "thunder-showers-night": "thunder-showers-night.png",
  };

  const iconName = iconMappings[iconCode] || "clear.png";
  const iconSrc = require(`./icons/${iconName}`);

  return <img src={iconSrc} alt="Weather Icon" />;
};

export default IconsChangeLogic;
