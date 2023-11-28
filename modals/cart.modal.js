const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  price: Number,
});

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [productSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
