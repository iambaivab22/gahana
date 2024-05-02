const express = require("express");

const {
  createShopByBudget,

  deleteShopByBudget,
  getAllShopByBudget,
} = require("../controllers/shopByController");

const router = express.Router();

router.post("/shopByBudget/new", createShopByBudget);

router.get("/shopByBudget", getAllShopByBudget);
router.delete("/shopByBudget/:shopByBudgetId", deleteShopByBudget);
module.exports = router;
