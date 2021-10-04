/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable import/order */
/* eslint-disable no-console */
// eslint-disable-next-line max-len
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validate = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFound = require('./error/DataNotFound');
const corsOption = require('./middlewares/cors');

const { PORT = 8000 } = process.env;

const path = require('path');

const app = express();

app.use(cors(corsOption));

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validate),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }).unknown(true),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }).unknown(true),
}), login);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

app.use(errorLogger);
app.use(errorHandler);
app.use(errors());

app.use((req, res, next) => {
  next(new DataNotFound('Запрос на несуществующий адрес'));
});

app.listen(PORT, () => {
  console.log(`Приложение слушает ${PORT}`);
});
