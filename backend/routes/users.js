const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validate = require('../middlewares/validate');
const {
  getUsers,
  getUsersId,
  updateUser,
  updateUserAvatar,
  getUserData,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserData);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUsersId);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validate),
  }),
}), updateUserAvatar);

module.exports = router;
