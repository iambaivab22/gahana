const express = require("express");
const {
  createCart,
  deleteCart,
  updateCartProduct,
  getUsersCartByUserId,
} = require("../controllers/cartController");

const router = express.Router();
router.post("/cart/new", createCart);
router.get("/cart/:userId", getUsersCartByUserId);
router.patch("/cart/:userId", updateCartProduct);
router.delete("/cart/:userId", deleteCart);

module.exports = router;
