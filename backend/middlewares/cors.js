module.exports.corsConfig = {
  origin: [
    'https://flipster99964.students.nomoredomains.club',
    'http://flipster99964.students.nomoredomains.club',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
