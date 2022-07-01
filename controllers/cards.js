const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({data: cards}))
  .catch(err => res.status(500).send({message: err.message}))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then(card => res.send({data: card}))
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: "Переданы некорректные данные при создании карточки."});
    } else {
      res.status(500).send({message: err.message});
    }
  })
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => {
    if(!card) {
      res.status(404).send({message: "карточка с указанным id не найдена"});
    } else {
    res.send({data: card});
    }
  })
  .catch(err => res.status(500).send({message: err.message}))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: {likes: req.user._id} },
    { new: true }
    )
    .then(card => {
      if(!card) {
        res.status(404).send({message: "Передан несуществующий _id карточки."});
      } else {
        res.send({data: card.likes});
      }
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: "Переданы некорректные данные для постановки/снятии лайка."});
      } else {
        res.status(500).send({message: err.message});
      }
    })
}

module.exports.deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: {likes:req.user._id}},
    { new: true }
    )
    .then(card => {
      if(!card) {
        res.status(404).send({message: "Передан несуществующий _id карточки."});
      } else {
        res.send({data: card.likes});
      }
    })
    .catch(err => {
      if(err.name === 'ValidationError') {
        res.status(400).send({message: "Переданы некорректные данные для постановки/снятии лайка."});
      } else {
        res.status(500).send({message: err.message});
      }
    })
}