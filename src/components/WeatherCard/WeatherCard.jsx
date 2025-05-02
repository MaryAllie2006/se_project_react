import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { weatherOptions } from "../../utils/constants";
import "./WeatherCard.css";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionURL = filteredOptions[0]?.url;
  const weatherOptionsCondition = filteredOptions[0]?.condition;

  if (!weatherData || !weatherData.temp) {
    return <div>Loading...</div>;
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOptionURL}
        alt={weatherOptionsCondition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
