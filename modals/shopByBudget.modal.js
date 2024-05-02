const mongoose = require("mongoose");

const shopByBudgetSchema = new mongoose.Schema({
  name: {
    type: Number,
    unique: true,
    index: true,
  },
});

const ShopByBudget = mongoose.model("ShopByBud", shopByBudgetSchema);

module.exports = ShopByBudget;
