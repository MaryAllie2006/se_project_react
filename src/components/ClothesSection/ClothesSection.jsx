import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

  const currentUser = useContext(CurrentUserContext);
  const userItems = currentUser ? clothingItems.filter(card => card.owner === currentUser._id) : [];
  return (
    <div className="clothes-section">
      <div className="clothes-section__header" >
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-btn"
        >
          + ADD NEW{" "}
        </button>
      </div>

      <ul className="clothesSection__items__items">
        {userItems.map((filteredCard) => {
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
