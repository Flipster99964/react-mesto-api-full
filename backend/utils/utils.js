const allowedCors = [
  'https://flipster99964.students.nomoredomains.club/',
  'http://flipster99964.students.nomoredomains.club/',
  'localhost:3000',
];

module.exports.corsCheck = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin\
  const { method } = req;
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    return res.end();
  }

  return next();
};

module.exports = { allowedCors };
