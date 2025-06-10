import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";
import "./Main.css"; 
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
   const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
   const temp = weatherData.temp[currentTemperatureUnit];


   return (
    <main>
      <WeatherCard weatherData={weatherData}/>
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg; {currentTemperatureUnit} / You may want to wear:
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
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
