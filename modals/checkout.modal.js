const mongoose = require("mongoose");

const CheckOutProductSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

// const cartSchema = new mongoose.Schema({});

module.exports = mongoose.model("Checkout", CheckoutProductSchema);
