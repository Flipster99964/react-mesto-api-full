import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.onAddPlace]);

  const handleCardNameChange = (evt) => {
    setCardName(evt.target.value);
  };

  const handleCardLinkChange = (evt) => {
    setCardLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  };
  return (
    <PopupWithForm
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      buttonText="Создать"
      children={
        <>
          <input
            id="nameProfile-input"
            className="popup__field-text popup__name form__input"
            onChange={handleCardNameChange}
            value={cardName}
            placeholder="Название"
            required
            name="name"
            minLength="2"
            maxLength="40"
          />
          <span className="nameProfile-input-error form__input-error"></span>
          <input
            id="job-input"
            className="popup__field-text popup__job form__input"
            type="url"
            onChange={handleCardLinkChange}
            value={cardLink}
            placeholder="Ссылка на картинку"
            required
            name="link"
            minLength="2"
            maxLength="200"
          />
          <span className="job-input-error form__input-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
