import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarValue = useRef();

  useEffect(() => {
    avatarValue.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarValue.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      avatarValue={avatarValue}
      buttonText="Сохранить"
      children={
        <>
          <input
            className="popup__field-text popup__name form__input"
            ref={avatarValue}
            placeholder="Ссылка на картинку"
            required
            name="avatar"
          />
        </>
      }
    />
  );
}
export default EditAvatarPopup;
