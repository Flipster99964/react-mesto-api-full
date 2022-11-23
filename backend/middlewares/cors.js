const allowedCors = [
  'https://flipster99964.students.nomoredomains.club',
  'http://flipster99964.students.nomoredomains.club',
  'https://api.flipster99964.student.nomoredomains.club',
  'http://api.flipster99964.student.nomoredomains.club',
  'http://localhost:3000',
  'https://api.flipster99964.student.nomoredomains.club/users/me',
];

module.exports.corsCheck = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', '*');
    return res.end();
  }
  return next();
};
