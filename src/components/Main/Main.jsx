import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";
import "./Main.css"; 
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((card) => {
               return card.weather === weatherData.type;
            })
            .map((filteredCard) => {
              return (
                <ItemCard
                  key={filteredCard._id}
                  item={filteredCard}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
