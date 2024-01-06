const express = require("express");
const {
  createCart,
  deleteCart,
  updateCartProduct,
  getUsersCartByUserId,
  deleteProductFromCart,
} = require("../controllers/cartController");

const router = express.Router();
router.post("/cart/new", createCart);
router.get("/cart/:userId", getUsersCartByUserId);
router.patch("/cart/:productId", updateCartProduct);
router.delete("/cart", deleteProductFromCart);

module.exports = router;
