import "./ItemCard.css";
import React from "react";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={() => onCardClick(item)}
        className="card__image"
        src={item.link}
        alt={item.name}
      ></img>
      
    </li>
  );
}

export default ItemCard;
