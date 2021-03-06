/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  OK,
  salt
} = require('../constans/constans');
const IncorrectEmailAndPass = require('../error/IncorrectEmailAndPass');
const DataNotFound = require('../error/DataNotFound');
const ServerError = require('../error/ServerError');
const IncorectData = require('../error/IncorectData');
const RepeatRegistEmail = require('../error/RepeatRegistEmail');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((user) => res.status(OK).send({
    user
  }))
  .catch(() => {
    next(new ServerError('Ошибка на стороне сервера'));
  });

const getUsersId = (req, res, next) => {
  const {
    userId,
  } = req.params;
  return User.findById({
    id: userId,
  })
    .then((user) => {
      if (!user) {
        return next(new DataNotFound(`Нет пользователя с id=${_id}`));
      }
      res.status(OK).send({
        user
      });
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id'));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new RepeatRegistEmail('Пользователь с таким Email уже есть в системе'));
      }

      bcrypt.hash(password, salt)
        .then(hash => User.create({
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
          email: req.body.email,
          password: hash, // записываем хеш в базу
        }))
        .then(({
          email,
          _id
        }) => res.status(OK).send({
          email,
          _id
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new IncorectData('Введены некрректные данные при создании пользователя'));
          }
          next(new ServerError('Ошибка на стороне сервера'));
        });
    }).catch(next);
};

const updateUser = (req, res, next) => {
  const {
    name,
    about
  } = req.body;
  return User.findByIdAndUpdate(
    req.user.id, {
      name,
      about
    }, {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new DataNotFound(`Нет пользователя с id=${_id}`));
      }
      res.status(OK).send({
        user: user,
      });
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id'));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const updateUserAvatar = (req, res, next) => {
  const {
    avatar
  } = req.body;
  User.findByIdAndUpdate(
    req.user.id, {
      avatar
    }, {
      new: true,
      runValidators: true,
    },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        next(new DataNotFound(`Нет пользователя с id=${_id}`));
      }
      res.status(OK).send({
        user: user,
      });
    })

    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorectData('Введены некрректные данные при обновления аватара поьзователя'));
      }
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id'));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new IncorectData('Email или Пароль отсутствуют'));
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new IncorrectEmailAndPass('Передан неверный Email или Пароль'));
      } else {
        return bcrypt.compare(password, salt, (isValid) => {
          if (!isValid) {
            next(new IncorrectEmailAndPass('Передан неверный Email или Пароль'));
          } else {
            const token = jwt.sign({ id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
              { expiresIn: '7d' });

            return res.status(OK).send({ token });
          }
        });
      }
    })
    .catch(() => {
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

// if (!email || !password || !name) {
//   next(new IncorectData(' переданы некорректные данные в метод создания'));
// }
const getUserData = (req, res, next) => {
  const id = req.user.id;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        next(new DataNotFound(`Нет пользователя с ${id}`));
      }
      return res.status(OK).send({ user });
    })
    .catch(() => {
      next(new ServerError('Ошибка на стороне сервера'));
    });
};
module.exports = {
  getUsers,
  getUsersId,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUserData,
};
