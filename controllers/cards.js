const Card = require('../models/card');
const { BAD_REQUEST_CODE, NOT_FOUND_CODE, DEFAUTL_CODE } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Передан неккоректный _id для удаления карточки.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ data: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.send({ data: card.likes });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      } else {
        res.status(DEFAUTL_CODE).send({ message: 'Ошибка по умолчанию.' });
      }
    });
};
