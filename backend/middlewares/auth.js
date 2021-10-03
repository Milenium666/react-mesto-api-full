/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */

const jwt = require('jsonwebtoken');
const { TOKEN_SEKRET } = require('../constans/constans');
const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new IncorrectEmailAndPass('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_SEKRET);
  } catch (err) {
    return next(new IncorrectEmailAndPass('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
