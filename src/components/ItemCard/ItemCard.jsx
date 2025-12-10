import "./ItemCard.css";
import React from "react";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: item.likes && item.likes.includes(item.owner) });
  };
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <button className="card__like-button" onClick={handleLike}>
        {item.likes && item.likes.includes(item.owner) ? "Dislike" : "Like"}
      </button>
    </li>
  );
}

export default ItemCard;
