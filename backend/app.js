require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const BodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routes = require('./routes/routes');
const cenralErrors = require('./middlewares/central-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
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
app.use(cors({
  origin: 'https://flipster99964.students.nomoredomains.club',
}));
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(cenralErrors);

main();
