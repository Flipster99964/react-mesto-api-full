const ImagePopup = (props) => {
    const classPopupOpened = `${props.isOpen ? 'popup_opened' : ''}`;
    return (
    <div className={`popup imagePopup ${classPopupOpened}`}>
        <div className="imagePopup__container">
            <button type="button" className="popup__close-button imagePopup__close-button" onClick={props.onClose}></button>
            <img className="imagePopup__image" src={props.card.link} alt={props.card.name}/>
            <p className="imagePopup__text">{props.card.name}</p>
        </div>
        <div className="popup__bg"></div>
    </div>
    )}
export default ImagePopup;