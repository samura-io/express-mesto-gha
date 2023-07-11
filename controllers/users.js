const mongoose = require('mongoose');
const userModel = require('../models/user');

const VALIDATION_ERROR_CODE = 400;
const CAST_ERROR_CODE = 404;
const OTHER_EEROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  userModel.find({})
    .then(((data) => res.send(data)))
    .catch(() => res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  userModel.findById(req.params.id)
    .then(((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(CAST_ERROR_CODE).send({ message: `Пользователь по указанному id: ${req.params.id}, не найден` });
      }
    }))
    .catch(() => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный id' });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.name === 'CastError') {
        res.status(CAST_ERROR_CODE).send({ message: `Пользователь по указанному id: ${req.user._id}, не найден` });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватвра' });
      } else if (err.name === 'CastError') {
        res.status(CAST_ERROR_CODE).send({ message: `Пользователь по указанному id: ${req.user._id}, не найден` });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
