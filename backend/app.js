/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable import/order */
/* eslint-disable no-console */
// eslint-disable-next-line max-len
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validate = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFound = require('./error/DataNotFound');
const corsOption = require('./middlewares/cors');

const { PORT = 8080 } = process.env;

const app = express();

app.use(corsOption);

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validate),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
}), login);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use((req, res, next) => {
  next(new DataNotFound('Запрос на несуществующий адрес'));
});
app.use(errorLogger);
app.use(errorHandler);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Приложение слушает ${PORT}`);
});
