/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */

const allowedCors = [
  'https://milenium666.nomoredomains.monster',
  'http://milenium666.nomoredomains.monster',
  'https://milenium666.nomoredomains.rocks/api',
  'http://milenium666.nomoredomains.rocks/api',
  'http://localhost:8080/api',
  'https://localhost:8080/api',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsOption = (req, res, next) => {
  const { origin } = req.headers;
  // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};

module.exports = corsOption;
