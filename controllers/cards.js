const mongoose = require('mongoose');
const cardModel = require('../models/card');

const VALIDATION_ERROR_CODE = 400;
const CAST_ERROR_CODE = 404;
const OTHER_EEROR_CODE = 500;

module.exports.getCards = (req, res) => {
  cardModel.find({})
    .then((data) => res.send(data))
    .catch(() => res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(CAST_ERROR_CODE).send({ message: `Карточка с указанном id: ${req.params.cardId}, не найдена` }));
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
        res.status(CAST_ERROR_CODE).send({ message: `Передан несуществующий id: ${req.params.cardId} карточки` });
      }
    })
    .catch(() => {
      if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный id карточки' });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.unlikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(CAST_ERROR_CODE).send({ message: `Передан несуществующий id: ${req.params.cardId} карточки` });
      }
    })
    .catch(() => {
      if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный id карточки' });
      } else {
        res.status(OTHER_EEROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};
