const router = require('express').Router();
const cookieParser = require('cookie-parser');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFound');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

const {
  validationEmailAndPassword,
} = require('../middlewares/validation');

const INTERNAL_SERVER_ERROR = 500;

router.post('/signin', validationEmailAndPassword, login);
router.post('/signup', validationEmailAndPassword, createUser);
router.post('/signout', logout);
router.use(cookieParser());
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Неверный путь'));
});

router.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
  next();
});

module.exports = router;
