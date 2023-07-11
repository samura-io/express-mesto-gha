const userModel = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  userModel.find({})
    .then(((data) => res.send(data)))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  userModel.findById(req.params.id)
    .then(((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному id: ${req.params.id}, не найден` });
      }
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Передан некорректный id' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(NOT_FOUND).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному id: ${req.user._id}, не найден` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(((user) => res.send({ data: user })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватвра' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND).send({ message: `Пользователь по указанному id: ${req.user._id}, не найден` });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
