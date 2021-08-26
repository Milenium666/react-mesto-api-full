const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: 'String',
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  link: {
    type: 'String',
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
