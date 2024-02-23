function getDayOfWeek(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

export default getDayOfWeek;
