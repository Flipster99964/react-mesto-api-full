require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes/routes');
const cenralErrors = require('./middlewares/central-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://flipster99964.students.nomoredomains.club',
  'http://flipster99964.students.nomoredomains.club',
  'https://api.flipster99964.student.nomoredomains.club/users/me',
  'http://api.flipster99964.student.nomoredomains.club',
];
const app = express();
const PORT = 3000;
function corsCheck(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
}
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(corsCheck);
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(cenralErrors);

main();
