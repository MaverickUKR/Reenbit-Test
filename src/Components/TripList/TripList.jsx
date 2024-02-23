import React from "react";
import { useState } from "react";
import "./TripList.css";

const TripList = ({ trips, onSelect, onDeleteTrip }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const maxTripsToShow = 3;
  const hasNext = visibleStartIndex + maxTripsToShow < trips.length;
  const hasPrevious = visibleStartIndex > 0;
  const showNextTrips = () => {
    if (hasNext) {
      setVisibleStartIndex(visibleStartIndex + maxTripsToShow);
    }
  };
  const showPreviousTrips = () => {
    if (hasPrevious) {
      setVisibleStartIndex(visibleStartIndex - maxTripsToShow);
    }
  };
  const filteredTrips = trips
    .filter((trip) =>
      trip.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const visibleTrips = filteredTrips.slice(
    visibleStartIndex,
    visibleStartIndex + maxTripsToShow
  );
  return (
    <div>
      <input
        style={{ marginLeft: "40px" }}
        type="text"
        placeholder="Search your trip"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <ul className="trip-list">
        {hasPrevious && (
          <span className="previous" onClick={showPreviousTrips}>
            &lt;
          </span>
        )}
        {visibleTrips.map((trip) => (
          <li
            className="trip-card"
            key={trip.id}
            onClick={() => onSelect(trip)}
          >
            <div className="card-img">
              <button
                className="card-delete"
                onClick={() => onDeleteTrip(trip.city)}
              >
                x
              </button>
              <img
                className="img"
                src={window.location.origin + `/assets/cities/${trip.city}.jpg`}
                alt={trip.city}
                height={150}
                width={150}
              />
            </div>
            <span className="trip-city">{trip.city}</span>
            <br />
            <span className="trip-dates">
              {new Date(trip.startDate).toLocaleDateString()} to{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </li>
        ))}
        {hasNext && (
          <span className="next" onClick={showNextTrips}>
            &gt;
          </span>
        )}
      </ul>
    </div>
  );
};

export default TripList;
