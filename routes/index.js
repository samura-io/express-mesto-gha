const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NOT_FOUND = 404;

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/', (req, res, next) => {
  next(res.status(NOT_FOUND).send({ message: 'Неверный путь' }));
});

module.exports = router;
