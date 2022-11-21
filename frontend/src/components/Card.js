import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(
    (likeOnCard) => likeOnCard._id === currentUser._id
  );

  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;
  const cardDeleteButtonClassName = `element__delete-button ${
    !isOwn && "element__delete-btn_hidden"
  }`;
  const handleImageClick = () => {
    props.onCardClick(props.card);
  };
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
    console.log("hello");
  }
  return (
    <div className="element">
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <img
        src={props.card.link}
        onClick={handleImageClick}
        alt={`${props.card.name}`}
        className="element__image"
      />
      <div className="element__block">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonClassName}
          ></button>
          <span className="element__likes-number">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
