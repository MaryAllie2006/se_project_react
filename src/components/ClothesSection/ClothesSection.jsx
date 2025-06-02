import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";

function ClothesSection({ handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + ADD NEW{" "}
        </button>
      </div>

      <ul className="clothesSection__items__items">
        {defaultClothingItems.map((filteredCard) => {
          return (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
