import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      handleSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      children={
        <>
          <input
            className="popup__field-text popup__name form__input"
            onChange={handleNameChange}
            value={name || ''}
            placeholder="Имя"
            required
            name="name"
            minLength="2"
            maxLength="40"
          />
          <span className="nameProfile-input-error form__input-error"></span>
          <input
            className="popup__field-text popup__job form__input"
            onChange={handleDescriptionChange}
            value={description || ''}
            placeholder="Описание"
            required
            name="about"
            minLength="2"
            maxLength="200"
          />
          <span className="job-input-error form__input-error"></span>
        </>
      }
    />
  );
}
export default EditProfilePopup;