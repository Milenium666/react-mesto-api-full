/* eslint-disable space-in-parens */
// eslint-disable-next-line max-len
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */

const Card = require('../models/card');
const {
  OK,
} = require('../constans/constans');

const DataNotFound = require('../error/DataNotFound');
const IncorectData = require('../error/IncorectData');
const ServerError = require('../error/ServerError');
const NoRight = require('../error/NoRight');

const getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send({ cards }))
    .catch(() => {
      next(new DataNotFound('Карточки не найдены'));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user.id;
  Card.create({ name, link, owner: userId })

    .then((card) => res.status(OK).send( card ))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorectData('Введены некрректные данные при создании карточки'));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const deleteCard = (req, res, next) => {
  const userId = req.user.id;
  Card.findById(req.params.cardId)

    .then((card) => {
      if (!card) {
        return next(new DataNotFound(`Нет карточки с id=${_id}`));
      }
      if (userId !== card.owner.toString()) {
        next(new NoRight('Нет прав для удаления карточки'));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(OK).send({ card }));
      }
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id '));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new DataNotFound(`Нет карточки с id=${_id}`));
      }
      res.status(OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id '));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new DataNotFound(`Нет карточки с id=${_id}`));
      }
      res.status(OK).send({ card });
    })
    .catch(() => {
      if (err.name === 'ReferenceError') {
        next(new DataNotFound('Невалидный id '));
      }
      next(new ServerError('Ошибка на стороне сервера'));
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
