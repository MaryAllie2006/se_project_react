import "./ItemCard.css";
import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likedHeart from "../../images/State=Liked.svg";
import unlikedHeart from "../../images/❤.svg";

function ItemCard({ item, onCardLike, handleCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = currentUser && item.likes?.some((id) => id === currentUser._id);
  const [optimisticLike, setOptimisticLike] = useState(null);

  // Clear optimistic state when actual item data updates from parent
  useEffect(() => {
    setOptimisticLike(null);
  }, [item.likes]);

  const handleLike = () => {
    // Optimistic update
    setOptimisticLike(!isLiked);
    
    onCardLike({ id: item._id, isLiked })
      .catch(() => {
        setOptimisticLike(null); // Reset on error
      });
  };

  // Use optimistic state if set, otherwise use actual state
  const displayLiked = optimisticLike !== null ? optimisticLike : isLiked;

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
          <img
            src={displayLiked ? likedHeart : unlikedHeart}
            alt={displayLiked ? "Unlike" : "Like"}
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
