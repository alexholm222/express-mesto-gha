const User = require('../models/user');
const { BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAUTL_CODE } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Передан некорректный _id.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
