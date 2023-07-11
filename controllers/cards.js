const mongoose = require('mongoose');
const cardModel = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  cardModel.find({})
    .then((data) => res.send(data))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then((data) => {
      if (data) {
        res.send({ message: 'Карточка удалена' });
      } else {
        res.status(NOT_FOUND).send({ message: `Карточка с указанном id: ${req.params.cardId}, не найдена` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный id карточки' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND).send({ message: `Передан несуществующий id: ${req.params.cardId} карточки` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Передан некорректный id карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.unlikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(NOT_FOUND).send({ message: `Передан несуществующий id: ${req.params.cardId} карточки` });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Передан некорректный id карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
