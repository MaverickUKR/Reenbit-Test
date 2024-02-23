import React, { useState, useEffect } from "react";
import "./TripDetails.css";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import WeatherForecast from "../WeatherForecast/WeatherForecast";

const TripDetails = ({ selectedTrip }) => {
  const [todayWeather, setTodayWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async (city) => {
      const apiKey = "58UQX37QECDYA6SMPSFGQPEHB";
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=${apiKey}&contentType=json`
        );
        if (response.ok) {
          const data = await response.json();
          setTodayWeather(data);
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    if (selectedTrip) {
      fetchWeather(selectedTrip.city);
    }
  }, [selectedTrip]);

  return (
    <div className="trip-details">
      {selectedTrip && (
        <div className="trip-details__content">
          {todayWeather && <WeatherForecast todayWeather={todayWeather} />}
          <h3>{selectedTrip.city}</h3>
          <CountdownTimer targetDate={selectedTrip.startDate} />
        </div>
      )}
    </div>
  );
};

export default TripDetails;
