const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationUserInfo,
  validationUserAvatar,
  validationEmailAndPassword,
  validationUserId,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
} = require('../controllers/users');

usersRouter.post('/signin', validationEmailAndPassword, login);
usersRouter.post('/signup', validationEmailAndPassword, createUser);
usersRouter.use(auth);
usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:id', validationUserId, getUserById);
usersRouter.patch('/me', validationUserInfo, updateUser);
usersRouter.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = usersRouter;
