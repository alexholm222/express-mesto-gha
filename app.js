const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.user = {
    _id: '62bc5121795cf342f3676736'
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', (req, res, next) => next(
  new Error('Запрошен не существующий ресурс'),
));
app.listen(PORT)