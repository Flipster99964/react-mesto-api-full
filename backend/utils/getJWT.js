const { NODE_ENV, SECRET_JWT } = process.env;

// eslint-disable-next-line func-names
module.exports.getJWT = function () {
  return NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret';
};
