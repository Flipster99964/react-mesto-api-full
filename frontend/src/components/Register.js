import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister(email, password);
    resetForm()
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    }

  return (
    <>
    <Header>
    <Link to="/sign-in" className="header__menu-item">Войти</Link>
  </Header>
    <div className="login elements">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          required
          type="email"
          className="login__input"
          placeholder="Email"
        />
        <input
          name="password"
          value={password}
          onChange={handleChange}
          required
          type="password"
          className="login__input"
          placeholder="Пароль"
        />
        <button type="submit" onClick={props.onRegister} className="login__submit-button">Зарегистрироваться</button>
      </form>
      <p className="login__extra-text">
        Уже зарегистрированы? <Link className="login__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
    </>
  );
}

export default Register;