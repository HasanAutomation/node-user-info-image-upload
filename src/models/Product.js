const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
  {
    itemNumber: {
      type: String,
      index: true,
      unique: true,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
