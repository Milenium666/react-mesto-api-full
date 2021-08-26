/* eslint-disable no-unreachable */
/* eslint-disable no-new */
/* eslint-disable no-unused-expressions */

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || 'Ошибка сервера';

  return res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
