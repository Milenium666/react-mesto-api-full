/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
const isEmail = require('validator/lib/isEmail');
const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: 'String',
    minlenght: 2,
    maxlenght: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: 'String',
    minlenght: 2,
    maxlenght: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: 'String',
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [{ validator: (value) => isEmail(value), msg: 'Invalid email.' }],

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
