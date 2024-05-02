const express = require("express");
const {
  createOrder,
  deleteSpecificCartOrder,
  updateOrderedProduct,
  getOrderedProductList,
} = require("../controllers/orderController");

const router = express.Router();
router.post("/order/new/:userId", createOrder);
router.get("/order", getOrderedProductList);
router.patch("/order/:userId", updateOrderedProduct);
router.delete("/order/:userId", deleteSpecificCartOrder);

module.exports = router;
