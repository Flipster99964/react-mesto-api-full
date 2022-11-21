import React from 'react';
import { useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import Header from './Header';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
    resetForm()
  }
  function resetForm() {
    setEmail('');
    setPassword('');
    }
    return (
      <>
      <Header>
        <Link to="/sign-up" className="header__menu-item">Регистрация</Link>
      </Header>
      <div className="login elements">
        <h2 className="login__title">Вход</h2>
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
          <button rype="submit" className="login__submit-button">Войти</button>
        </form>
      </div>
      </>
    );
  }
  
  export default withRouter(Login);