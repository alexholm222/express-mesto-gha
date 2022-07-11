const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_CODE } = require('../utils/constants');

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED_CODE).send({ message: 'Ошибка авторизации' });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'all2233eeewes');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  next();
};
