const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  req.user = {
    _id: '64a96ed5c0c3837bdf7d4692',
  };
  next();
});

app.use('/', router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
