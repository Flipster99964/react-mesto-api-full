function PopupWithForm(props) {
  const classPopupOpened = `${props.isOpen ? "popup_opened" : ""}`;
  return (
    <div className={`popup ${classPopupOpened}`}>
      <button
        className="popup__close-button"
        onClick={props.onClose}
        type="button"
        aria-label="Закрыть"
      ></button>
      <form
        className="popup__container form"
        onSubmit={props.handleSubmit}
        name={`form-${props.name}`}
        action="form"
        method="post"
      >
        <h3 className="popup__text">{props.title}</h3>
        {props.children}
      <button className="popup__submit-text popup__submit-button"
            type="submit">
            {props.buttonText}
          </button>
      </form>
    </div>
  );
}
export default PopupWithForm;
