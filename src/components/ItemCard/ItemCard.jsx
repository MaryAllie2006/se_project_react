import "./ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const currentUser = useContext(CurrentUserContext);
const isLiked = currentUser && item.likes?.some((id) => id === currentUser._id);
const handleLike = () => {
  onCardLike({ id: item._id, isLiked });
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button className="card__like-button" onClick={handleLike}>
          {isLiked ? "Dislike" : "Like"}
        </button>
      )}
    </li>
  );
};

export default ItemCard;
