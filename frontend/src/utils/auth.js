//const BASE_URL = 'https://api.flipster99964.student.nomoredomains.club';
const BASE_URL = 'http://localhost:3000';
export function register({email, password}) {
  const url = `${BASE_URL}/signup`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
    .then(res => {
      if (res.ok) return res.json();
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    });
}

export function authorize({email, password}) {
  const url = `${BASE_URL}/signin`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  })
    .then(res => {
      if (res.ok) return res.json();
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    })
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      console.log(res.status)
      if (res.ok) {
        return res.json();
      }
      // Получить сообщение об ошибке с сервера
      return res.json().then((res) => {
        throw new Error(res.message);
      });
    });
}