import { useState, useEffect } from "react";
import "./WeekForecast.css";
import IconsChangeLogic from "../WeatherForecast/IconsChangeLogic";
import getDayOfWeek from "../utils/getDayOfWeek";

const WeekForecast = ({ city, startDate, endDate, selectedTrip }) => {
  const [forecast, setForecast] = useState("");
  useEffect(() => {
    const fetchAllTripWeather = async (city) => {
      try {
        const apiKey = "58UQX37QECDYA6SMPSFGQPEHB";
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`; // Construct the correct API URL
        const response = await fetch(url);
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        console.error("Error fetching week's weather:", error);
      }
    };
    if (selectedTrip) {
      fetchAllTripWeather(selectedTrip.city);
    }
  }, [city, startDate, endDate, selectedTrip]);
  const renderWeekForecast = (day) => {
    return forecast.days.map((day, index) => (
      <div className="forecast-wrapper" key={index}>
        <p>{getDayOfWeek(day.datetime)}</p>
        <IconsChangeLogic iconCode={day.icon} />
        <p>
          {day.tempmin}°/{day.tempmax}°
        </p>
      </div>
    ));
  };
  return (
    <div className="forecast">
      {forecast && selectedTrip ? renderWeekForecast() : <p>Loading...</p>}
    </div>
  );
};

export default WeekForecast;
