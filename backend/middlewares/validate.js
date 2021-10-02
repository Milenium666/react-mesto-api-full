/* eslint-disable no-else-return */
/* eslint-disable no-extra-semi */
/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */

const validator = require('validator');

const validate = (value) => {
  let result = validator.isURL(value);
  if (result) {
    return value;
  } else {
    throw new Error('URL validation err');
  };
};

module.exports = validate;
