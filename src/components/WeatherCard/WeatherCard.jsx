import sunny from "../../images/sunny.svg";
import './WeatherCard.css';

function WeatherCard({ weatherData }){
    if (!weatherData || !weatherData.temp) {
        return <div>Loading...</div>;
    }
    
    return <section className="weather-card">
        <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
        <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
}

export default WeatherCard;