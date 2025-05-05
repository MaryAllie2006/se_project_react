import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";

function ClothesSection({handleCardClick}) {
    return (
      <div className="clothes-section">
        <div>
            <p>Your Items</p>
            <button>+ ADD NEW </button>
        </div>
        
        <ul className="clothesSection__items__items">
          {defaultClothingItems.map((filteredCard) => {
              return (
                <ItemCard
                  key={filteredCard._id}
                  item={filteredCard}
                  //TODO - pass as prop 
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
        
      </div>
    );
  
}

export default ClothesSection;
