
import { weatherOptions } from "../../utils/constants";
import './WeatherCard.css';

function WeatherCard({ weatherData }){

    const filteredOptions = weatherOptions.filter((option) => {
        return option.day === weatherData.isDay && option.condition === weatherData.condition; 
    }); 

    const weatherOptionURL = filteredOptions[0]?.url; 
    const weatherOptionsCondition = filteredOptions[0]?.condition; 

    if (!weatherData || !weatherData.temp) {
        return <div>Loading...</div>;
    }
    
    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img src={weatherOptionURL} alt={weatherOptionsCondition} className="weather-card__image" />
    </section>
}

export default WeatherCard;