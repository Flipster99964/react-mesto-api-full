import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);
  const [isCurrentCardOnDelete, setCurrentCardOnDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards()])
        .then(([dataCards]) => {
          setCards(dataCards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (likeOnCard) => likeOnCard._id === currentUser._id
    );

    api
      .toggleCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((oldCard) => (oldCard._id === card._id ? newCard : oldCard))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setCurrentCardOnDelete(card);
    setConfirmPopupOpen(true);
  }

  function handleDeleteConfirm(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((oldCard) => oldCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  const handleAddPlaceSubmit = (newCard) => {
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  function handleShowInfoMessage(message) {
    setInfoMessage(message);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleUpdateUser = (obj) => {
    api
      .editUserInfo(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  const handleUpdateAvatar = (avatarObj) => {
    api
      .editAvatar(avatarObj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoMessage(null);
  };

  function handleRegister(email, password) {
    auth
      .register({ email, password })
      .then((res) => {
        setLoggedIn(true);
        history.push("/sign-in");
        handleShowInfoMessage({
          text: "Вы успешно зарегистрировались!",
          isSuccess: true,
        });
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        const text = err.message || "Что-то пошло не так! Попробуйте еще раз.";
        handleShowInfoMessage({
          text: text,
          isSuccess: false,
        });
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            exact
            path="/"
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            email={email}
            onLogout={handleLogout}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          card={isCurrentCardOnDelete}
          onDeleteCard={handleDeleteConfirm}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip message={infoMessage} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
