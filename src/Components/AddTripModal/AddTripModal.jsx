import React, { useState } from "react";
import cities from "./cities";
import "./AddTripModal.css";

const AddTripModal = ({ onAddTrip, onClose }) => {
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddTrip = (trips) => {
    if (!selectedCity || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;
    const selectedStartDate = new Date(startDate).getTime();
    const selectedEndDate = new Date(endDate).getTime();
    const timestamp = new Date(today).getTime() + fifteenDays;
    if (startDate < today) {
      alert("Start date can't be earlier than today");
      return;
    }
    if (timestamp - selectedStartDate < 0) {
      alert("Start date should be within the next 15 days ");
      return;
    }
    if (selectedEndDate - selectedStartDate > fifteenDays) {
      alert("End date should be within the next 15 days after start date ");
      return;
    }
    if (endDate < startDate) {
      alert("End date can't be earlier than start date");
      return;
    }
    const newTrip = { id: Date.now(), city: selectedCity, startDate, endDate };
    if (startDate) onAddTrip(newTrip);
    onClose();
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal__header">
          <h4>Create trip</h4>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal__content">
          <label>
            City
            <select
              className="select-input"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Start Date
            <input
              className="date-input"
              placeholder="Select date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date
            <input
              className="date-input"
              name="Select date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <hr />
        <div className="modal__footer">
          <button className="modal__btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal__btn" onClick={handleAddTrip}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTripModal;
