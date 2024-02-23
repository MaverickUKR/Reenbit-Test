import React from "react";
import "./WeatherForecast.css";
import IconsChangeLogic from "./IconsChangeLogic.jsx";
import getDayOfWeek from "../utils/getDayOfWeek";

const WeatherForecast = ({ todayWeather }) => {
  const renderWeatherDetails = (day) => {
    return todayWeather.days.map((day, index) => (
      <div className="weather-wrapper" key={index}>
        <h2 style={{ marginTop: "110px" }}>{getDayOfWeek(day.datetime)}</h2>
        <div style={{ display: "flex" }}>
          <IconsChangeLogic iconCode={day.icon} />
          <h1>{day.temp}°C</h1>
        </div>
      </div>
    ));
  };

  return <div>{renderWeatherDetails()}</div>;
};

export default WeatherForecast;
