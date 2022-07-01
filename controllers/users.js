const User = require('../models/user')

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({data: users}))
  .catch(err => res.status(500).send({message: err.message}));
}

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
  .then(user => {
    if(!user) {
      res.status(404).send({message: "Пользователь по указанному _id не найден."})
    } else {
      res.send({data: user})
    }
  })
  .catch(err => res.status(500).send({message: err.message}))
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: "Переданы некорректные данные при создании пользователя."})
    } else {
      res.status(500).send({message: err.message})
    }
  })
}

module.exports.updateUser = (req, res) => {
  const {name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about}, {
    new: true,
    runValidators: true,
    upsert: true
  })
  .then(user => {
    if(!user) {
      res.status(404).send({message: "Пользователь с указанным _id не найден."})
    } else {
      res.send({data: user})
    }
  })
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: "Переданы некорректные данные при создании пользователя."})
    } else {
      res.status(500).send({message: err.message})
    }
  })
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true
  })
  .then(user => {
    if(!user) {
      res.status(404).send({message: "Пользователь с указанным _id не найден."})
    } else {
      res.send({data: user})
    }
  })
  .catch(err => {
    if(err.name === 'ValidationError') {
      res.status(400).send({message: "Переданы некорректные данные при создании пользователя."})
    } else {
      res.status(500).send({message: err.message})
    }
  })
}