const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    surname: {
      type: String
    },
    name: {
      type: String
    },
    street: {
        type: String
    },
    numb: {
        type: String
    },
    apartment: {
        type: String
    },
    nameOrder: {
        type: String
    },
    sumOrder: {
        type: String
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Order', schema);