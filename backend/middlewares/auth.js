/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken');
const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new IncorrectEmailAndPass('Необходима авторизация'));
  }
  // if (!req.cookies.token) {
  //   return next(new IncorrectEmailAndPass('Необходима авторизация'));
  // }

  const token = authorization.replace('Bearer ', '');
  // const token = req.cookies.token;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    return next(new IncorrectEmailAndPass('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
