import "./ItemCard.css";
import React from "react";

function ItemCard({ item, handleCardClick }) {
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      ></img>
      
    </li>
  );
}

export default ItemCard;
