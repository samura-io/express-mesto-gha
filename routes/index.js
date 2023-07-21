const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFound');

const INTERNAL_SERVER_ERROR = 500;

router.use(cookieParser());
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Неверный путь'));
});

router.use(errors());

router.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
  next();
});

module.exports = router;
