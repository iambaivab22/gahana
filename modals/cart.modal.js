const mongoose = require("mongoose");
const productSchema = require("./product.modal");

const cartProductSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: Number,
      price: Number,
    },
  ],
});

// const cartSchema = new mongoose.Schema({});

module.exports = mongoose.model("Cart", cartProductSchema);
