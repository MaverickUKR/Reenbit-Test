import { useState, useEffect } from "react";
import TripList from "./Components/TripList/TripList";
import TripDetails from "./Components/TripDetails/TripDetails";
import AddTripModal from "./Components/AddTripModal/AddTripModal";
import WeekForecast from "./Components/WeekForecast/WeekForecast";
import "./App.css";

const App = () => {
  const defaultTrip = [
    {
      id: 1,
      city: "Kyiv",
      startDate: "2024-03-01",
      endDate: "2024-03-05",
    },
  ];
  const [trips, setTrips] = useState(defaultTrip);
  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);

  const addTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
  };
  const deleteTrip = (city) => {
    setTrips(trips.filter((trip) => trip.city !== city));
  };
  const onSelect = (trip) => {
    setSelectedTrip(trip);
  };

  useEffect(() => {
    const fetchTodayWeather = async () => {
      if (selectedTrip) {
        try {
          const apiKey = "58UQX37QECDYA6SMPSFGQPEHB";
          const today = new Date().toISOString().split("T")[0];
          const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/${today}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log(data);
          setTodayWeather(data.days[0]);
        } catch (error) {
          console.error("Error fetching today's weather:", error);
        }
      }
    };

    fetchTodayWeather();
  }, [selectedTrip]);

  useEffect(() => {
    const savedTrips = localStorage.getItem("trips");
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  useEffect(() => {
    if (trips !== defaultTrip) {
      localStorage.setItem("trips", JSON.stringify(trips));
    }
  }, [trips, defaultTrip]);

  return (
    <div className="app">
      <div>
        <h4 style={{ marginLeft: "40px" }}>
          Weather <b>Forecast</b>
        </h4>
        <div className="trips">
          <div className="trips-wrapper">
            <TripList
              trips={trips}
              onSelect={onSelect}
              onDeleteTrip={deleteTrip}
            />
            <button
              className="addTrips-btn"
              onClick={() => setShowAddTripModal(true)}
            >
              Add Trip
            </button>
          </div>
        </div>
        <div className="weather-content">
          <h4 style={{ marginLeft: "40px" }}>Week</h4>
          {selectedTrip ? (
            <WeekForecast
              selectedTrip={selectedTrip}
              city={selectedTrip.city}
              startDate={selectedTrip.startDate}
              endDate={selectedTrip.endDate}
            />
          ) : (
            <div style={{ marginLeft: "40px" }}>
              Select a trip to see details
            </div>
          )}
        </div>
        {showAddTripModal && (
          <AddTripModal
            onAddTrip={addTrip}
            onClose={() => setShowAddTripModal(false)}
          />
        )}
      </div>
      <div className="details-wrapper">
        {selectedTrip ? (
          <TripDetails trip={selectedTrip} todayWeather={todayWeather} />
        ) : (
          <div style={{ marginLeft: "40px" }}>Select a trip to see details</div>
        )}
        {selectedTrip && <TripDetails selectedTrip={selectedTrip} />}
      </div>
    </div>
  );
};

export default App;
