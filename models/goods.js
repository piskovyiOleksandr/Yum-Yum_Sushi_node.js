const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    category: {
      type: String,
      enum: ['drinks', 'desserts'],
      required: true,
      default: 'role'
    },
    ukC: {
      type: String
    },
    name: {
      type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    weight: {
      type: String
    },
    img: {
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

module.exports = mongoose.model('Goods', schema);