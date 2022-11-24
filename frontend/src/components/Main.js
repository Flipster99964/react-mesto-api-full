import { useContext } from "react";
import Card from "./Card";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const user = useContext(CurrentUserContext);
  return (
    <>
      <Header>
        <div className="header__menu">
            <p className="header__menu-item">{props.email}</p>
            <button href="#" className="header__menu-item" onClick={props.onLogout}>
              Выйти</button>
         </div>
      </Header>
    <main>
        <section className="profile">
          <img
            className="profile__avatar"
            src={user.avatar}
            alt="аватар профиля"
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-btn"
          ></button>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{user.name}</h1>
              <p className="profile__description">{user.about}</p>
            </div>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
            ></button>
          </div>
          <button
            type="button"
            onClick={props.onAddPlace}
            className="profile__add-button"
          ></button>
        </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
      </main>
    </>
  );
};
export default Main;
