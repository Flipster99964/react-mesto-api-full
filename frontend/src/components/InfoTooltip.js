function InfoTooltip( props ) {
    return (
        <div
          className={`popup popup_type_info` + (props.message ? " popup_opened" : "")}
        >
        <button
              className="popup__close-button"
              type="button"
              aria-label="Закрыть окно"
              onClick={props.onClose}
        ></button>
        <div className="popup__container content__element">
          <p
            className={
              "popup__info-message" +
              (props.message &&
                (props.message.isSuccess
                  ? " popup__info-message_type_success"
                  : " popup__info-message_type_fail"))
            }
          >
            {props.message && props.message.text}
          </p>
  
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;