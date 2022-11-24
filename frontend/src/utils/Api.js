console.log(`Bearer ${localStorage.getItem('token')}`)
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    // Получение карточек
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
      }).then(res => this._parseResponse(res));
    }
    // Добавление новой карточки через попап
  addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(res => this._parseResponse(res));
    }
    // Удаление карточки
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
      }).then(res => this._parseResponse(res));
    }
  // ставим/убираем лайк
  toggleCardLike(cardId, hasLike) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: hasLike ? 'DELETE' : 'PUT',
      headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
      }).then(res => this._parseResponse(res));
    }
    // Получение информации о пользователе
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
      }).then(res => this._parseResponse(res));
    }
    // Редактирование информации о пользователе
  editUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      }).then(res => this._parseResponse(res));
    }
    // Редактирование аватара через попап
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(res => this._parseResponse(res));
  }
}
// API
export const api = new Api({
  baseUrl: 'https://api.flipster99964.student.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  }
});
