import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onDeleteCard(props.card);
  };

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
      buttonText="Да"
    />
  );
}

export default ConfirmPopup;